/**
 * Created by bocharovf on 08.06.17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CloudTag} from "../result/CloudTag";

const SAMPLES_STUB = [
  'java, c#, python',
  'javascript, typescript',
  'mysql, oracle, sql server'
];
const CLOUD_TAG_STUB = [
  new CloudTag('java', 10),
  new CloudTag('c++', 10),
  new CloudTag('python', 9),
  new CloudTag('c#', 9),
  new CloudTag('javascript', 9),
  new CloudTag('php', 9),
  new CloudTag('swift', 8),
  new CloudTag('ruby', 8),
  new CloudTag('vb.net', 8),
  new CloudTag('pl/sql', 8),
  new CloudTag('react.js', 8),
  new CloudTag('angular', 8),
  new CloudTag('perl', 6),
  new CloudTag('go', 6),
  new CloudTag('webpack', 6),
  new CloudTag('typescript', 6)
];
const AUTOCOMPLETE_WORDS_STUB = [
  'java', 'c#', 'python', 'php', 'c++',
  'vb.net', 'sql', 'sql server', 'abap',
  '1c', 'swift', 'perl', 'ruby', 'go',
  'javascript', 'typescript', 'angular',
  'react', 'rust', 'f#', 'es6', 'rxjs',
  'unity', 'scala', 'docker', 'oracle',
  'mysql', 'postgres', 'mongodb', 'redis',
  'webpack', 'jade', 'vue.js', 'browserify',
  'spring'
];

/**
 * Get data from backend
 */
@Injectable()
export class ApiService {

  /**
   * Tags to show in tag cloud
   */
  cloudTags: Observable<CloudTag[]>;

  /**
   * Search samples
   */
  samples: Observable<string>;

  constructor () {
    this.cloudTags = Observable.of(CLOUD_TAG_STUB);

    this.samples = Observable.create(
                (observer: any) => {
                  let rndIndex = Math.floor(Math.random()*SAMPLES_STUB.length);
                  let randomItem = SAMPLES_STUB[rndIndex];
                  observer.next(randomItem);
                }
              );
  }

  /**
   * List of words for autocomplete
   * @param token beginning of the word
   * @returns {Observable}
   */
  autocompleteWord(token: string): Observable<string[]> {
    return Observable.of(
      AUTOCOMPLETE_WORDS_STUB.filter((state: string) => state.toLowerCase()
        .startsWith(token.toLowerCase()))
    );
  }

}
