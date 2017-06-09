import {Component} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Observable} from 'rxjs';
import {ExperienceItem, AreaItem} from "hh-stats";
import {DictionaryService} from "../search/dictionary.service";

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsSectionComponent {

  areas1 = [{name:'Москва', id:1}, {name:'Екатеринбург', id: 2}];
  areas: Observable<AreaItem[]>;
  experiences: Observable<ExperienceItem[]>;
  selectedExperience: ExperienceItem;
  selectedArea: AreaItem;

  inProgress: Observable<boolean>;

  constructor(
    private searchService: SearchService,
    private dictionaryService: DictionaryService
  ) {

    this.experiences = this.dictionaryService.experiences;
    this.areas = this.dictionaryService.areas;

    this.inProgress = this.searchService.queriesOnAir.map(amount => amount > 0);

    let myLog2 = this.searchService.queriesOnAir.do(x=>console.log('onAir',x));
    myLog2.subscribe();

    let myLog = this.searchService.results.do(x=>console.log('myLog',x));
    myLog.subscribe();
  }

  onSearch(text) {
    console.log('search for', text);
    this.searchService.addSearch(['java'], '1', 'noExperience');
  }

  onAreaSelected(area) {
    console.log('area', area);
  }

  onExperienceSelected(experience) {
    console.log('experiences', experience);
  }
}
