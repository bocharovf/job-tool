/**
 * Created by bocharovf on 08.06.17.
 */
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {SearchModel} from './SearchModel';
import {HeadHunterApi, CurrencyConverter, DictCurrencyConverter} from "hh-stats";

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
const TIMEOUT = 2000;

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
                                .map(
                                  (currencies) => new DictCurrencyConverter(currencies)
                                );
    this.currencyConverter.subscribe();

    this.queriesOnAir = this.onAir.scan((acc, one) => acc + one, 0);

    this.results = this.updates
                      .scan(
                        (results: SearchModel[], operation: ISearchOperation) => operation(results),
                        INITIAL_RESULTS);

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
  addSearch(keywords: string[], area: string, experience: string) {
    this.currencyConverter
      .do(() => this.onAir.next(1))
      .flatMap(converter => {
        let query = this.api.getVacancy(converter, keywords, area, experience);
        return Observable.fromPromise(query);
      })
      .do(() => this.onAir.next(-1))
      .do(
        stat => this.newResults.next(new SearchModel(stat))
      )
      .subscribe();
  }

  /**
   * Remove particular search result from results
   * @param stat result to remove
   */
  removeSearch(stat: SearchModel): void {
    this.removeResults.next(stat);
  }

}
