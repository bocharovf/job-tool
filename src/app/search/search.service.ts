/**
 * Created by bocharovf on 08.06.17.
 */
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {SearchModel} from './SearchModel';
import {HeadHunterApi, CurrencyConverter, DictCurrencyConverter, RequestParam} from "hh-stats";
import {FilterItem} from "../filter/FilterItem";

/**
 * SearchModel Operation contract
 * allows to perform custom operations on
 * stored SearchModel's
 */
interface ISearchOperation extends Function {
  (results: SearchModel[]): SearchModel[];
}

const INITIAL_RESULTS = new Array<SearchModel>();
const USER_AGENT = 'job-tool, contact bocharovf@gmail.com';
const TIMEOUT = 3000;

/**
 * HH Api parameter to show only vacancies with salary
 * @type {RequestParam}
 */
const ONLY_WITH_SALARY = new RequestParam('only_with_salary', 'true');

/**
 * HH Api parameter to order vacancies by relevance
 * @type {RequestParam}
 */
const ORDER_BY_RELEVANCE = new RequestParam('order_by', 'relevance');

/**
 * Service responsible for producing salary and popularity statistics
 */
@Injectable()
export class SearchService {

  /**
   * Array of current search models
   */
  results: Observable<SearchModel[]>;

  /**
   * Amount of queries in progress
   */
  queriesOnAir: Observable<number>;

  /**
   * Action subject to change results
   * @type {Subject<any>}
   */
  private updates = new Subject<any>();
  private newResults = new Subject<SearchModel>();
  private removeResults = new Subject<SearchModel>();
  private onAir = new Subject<number>();

  private api = new HeadHunterApi(USER_AGENT, TIMEOUT);
  private currencyConverter: Observable<CurrencyConverter>;

  constructor () {

    this.currencyConverter = Observable
                                .fromPromise(this.api.getCurrencies())
                                .retry(2)
                                .map(
                                  (currencies) => new DictCurrencyConverter(currencies)
                                );
    this.currencyConverter.subscribe();

    this.queriesOnAir = this.onAir
                        .scan((acc, one) => acc + one, 0)
                        .publishReplay(1)
                        .refCount();

    this.results = this.updates
                      .scan(
                        (results: SearchModel[], operation: ISearchOperation) => operation(results),
                        INITIAL_RESULTS)
                      .publishReplay(1)
                      .refCount();

    this.newResults
      .map(result =>
          (results: SearchModel[]) => results.concat(result)
      )
      .subscribe(this.updates);

    this.removeResults
      .map(result =>
        (results: SearchModel[]) => {
          let index = results.indexOf(result);
          if (index > -1) {
            results.splice(index, 1);
          }
          return results;
        })
      .subscribe(this.updates);
  }

  /**
   * Add new search
   * @param keywords Array of synonyms to search for
   * @param area Area to search in
   * @param experience Experience to search for
   */
  addSearch(keywords: string[], area: FilterItem, experience: FilterItem) {
    let areaId = area ? area.id : null;
    let experienceId = experience ? experience.id : null;

    return this.currencyConverter
        .do(() => this.onAir.next(1))
        .flatMap(converter => {
          let query = this.api.getVacancy(converter, keywords, areaId, experienceId,
                                          ONLY_WITH_SALARY, ORDER_BY_RELEVANCE);
          return Observable.fromPromise(query);
        })
        .do(stat => {
          let result = new SearchModel(stat, keywords.join(','), experience, area);
          this.newResults.next(result);
        })
        .finally(() => this.onAir.next(-1))
        .retry(2);
  }

  /**
   * Remove particular search result from results
   * @param query result to remove
   */
  removeSearch(query: SearchModel): void {
    this.removeResults.next(query);
  }

}
