import {Component} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Observable} from 'rxjs';
import {ExperienceItem, AreaItem} from "hh-stats";
import {DictionaryService} from "../search/dictionary.service";
import {FilterItem} from "../filter/FilterItem";
import {SearchModel} from "../search/SearchModel";
import {CloudTag} from "../result/CloudTag";

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsSectionComponent {

  areas: Observable<FilterItem[]>;
  experiences: Observable<FilterItem[]>;
  inProgress: Observable<boolean>;
  results: Observable<SearchModel[]>;
  hasResults: Observable<boolean>;

  selectedExperience: FilterItem = null;
  selectedArea: FilterItem = null;
  cloudTags: CloudTag[] = [
    new CloudTag('c#', 5),
    new CloudTag('java', 9),
    new CloudTag('javascript', 10),
    new CloudTag('python', 4)
  ];

  constructor(
    private searchService: SearchService,
    private dictionaryService: DictionaryService
  ) {
    this.experiences = this.dictionaryService.experiences;
    this.areas = this.dictionaryService.areas;
    this.inProgress = this.searchService.queriesOnAir.map(amount => amount > 0);
    this.results = this.searchService.results;
    this.hasResults = this.results.map(results => results.length > 0);
  }

  onSearch(text) {
    let areaId = this.selectedArea ? this.selectedArea.id : null;
    let experienceId = this.selectedExperience ? this.selectedExperience.id : null;

    for (let token of text.split(',').map(t => t.trim())) {
      console.log('search for %s in area %s with experience %s', token, areaId, experienceId);
      this.searchService.addSearch([token], areaId, experienceId);
    }
  }

  onAreaSelected(area) {
    console.log('area', area);
  }

  onExperienceSelected(experience) {
    console.log('experiences', experience);
  }

  onRemoveQuery(query: SearchModel) {
    this.searchService.removeSearch(query);
  }
}
