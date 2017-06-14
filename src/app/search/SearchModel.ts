/**
 * Created by bocharovf on 08.06.17.
 */
import {VacancyStats} from 'hh-stats';
import {FilterItem} from "../filter/FilterItem";

/**
 * Search result representation
 */
export class SearchModel {

  /**
   * Create new SearchModel
   * @param stat search results
   * @param query original query
   * @param color color of that query
   */
  constructor (
    public stat: VacancyStats,
    public query: string,
    public experience: FilterItem,
    public area: FilterItem,
    public color?: string
  ) {
    this.color = color || SearchModel.getRandomColor();
  }

  static getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
