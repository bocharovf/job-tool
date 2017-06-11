/**
 * Created by bocharovf on 08.06.17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HeadHunterApi, AreaItem} from "hh-stats";
import {FilterItem} from "../filter/FilterItem";

const USER_AGENT = 'job-tool, contact bocharovf@gmail.com';
const TIMEOUT = 2000;

@Injectable()
export class DictionaryService {

  areas: Observable<FilterItem[]>;
  experiences: Observable<FilterItem[]>;

  private api = new HeadHunterApi(USER_AGENT, TIMEOUT);

  constructor () {
    this.areas = Observable
      .fromPromise(this.api.getAreas())
      .map(areas => DictionaryService.areasTree2FlatArray(areas));
    this.areas.subscribe();

    this.experiences = Observable
      .fromPromise(this.api.getExperincies())
      .map(experiences => experiences.map(exp => new FilterItem(exp.name, exp.id, null)));
    this.experiences.subscribe();
  }

  /**
   * Convert hierarchical tree of areas to flat array of filter items
   * @param areasTree areas tree
   * @returns {FilterItem[]} flat array of areas
   */
  private static areasTree2FlatArray(areasTree: AreaItem[]): FilterItem[]{
    let stack: {area: AreaItem, level: number, group: string}[];
    stack = areasTree.map(area => ({ area: area, level: 0, group: 'Страна'}));
    let flatArray: FilterItem[] = [];

    while(stack.length !== 0) {
      let item = stack.pop();
      let area = item.area;

      let filterItem = new FilterItem(area.name, area.id, item.group, item.level);
      flatArray.push(filterItem);

      if(area.areas && area.areas.length > 0) {
        let newItems = area.areas.map(a =>
          ({
            area: a,
            level: item.level + 1,
            group: area.name
          })
        );
        stack.push(...newItems);
      }
    }

    return flatArray;
  }

}
