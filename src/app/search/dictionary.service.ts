/**
 * Created by bocharovf on 08.06.17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HeadHunterApi, ExperienceItem, AreaItem} from "hh-stats";
import {FilterItem} from "../filter/FilterItem";
import {map} from "rxjs/operator/map";

const USER_AGENT = 'job-tool, contact bocharovf@gmail.com';
const TIMEOUT = 2000;

@Injectable()
export class DictionaryService {

  areas: Observable<FilterItem[]>;
  experiences: Observable<FilterItem[]>;
  areasFlat: Observable<FilterItem[]>;

  private api = new HeadHunterApi(USER_AGENT, TIMEOUT);

  constructor () {
    this.areas = Observable
      .fromPromise(this.api.getAreas())
      .map(areas => areas.map(area => new FilterItem(area.name, area.id, area.name)));
    this.areas.subscribe();

    this.experiences = Observable
      .fromPromise(this.api.getExperincies())
      .map(experiences => experiences.map(exp => new FilterItem(exp.name, exp.id, null)));
    this.experiences.subscribe();
  }

}
