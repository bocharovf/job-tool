/**
 * Created by bocharovf on 14.06.17.
 */

import {SearchModel} from "../search/SearchModel";
/**
 * Represents timeout error
 */
export class QueryError implements Error {
  name = "QueryError";
  message: string;
  /**
   *
   */
  constructor(public query: string, public innerError: Error) {
    this.message = `Ошибка запроса "${query}". 
    Нам очень жаль :( 
    Пожалуйста, попробуйте повторить запрос.`;
  }
}
