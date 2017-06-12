import {Component} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Observable} from 'rxjs';
import {ExperienceItem, AreaItem} from "hh-stats";
import {DictionaryService} from "../search/dictionary.service";
import {FilterItem} from "../filter/FilterItem";

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsSectionComponent {

  areas: Observable<FilterItem[]>;
  experiences: Observable<FilterItem[]>;
  inProgress: Observable<boolean>;

  selectedExperience: FilterItem = null;
  selectedArea: FilterItem = null;

  constructor(
    private searchService: SearchService,
    private dictionaryService: DictionaryService
  ) {
    this.experiences = this.dictionaryService.experiences;
    this.areas = this.dictionaryService.areas;
    this.inProgress = this.searchService.queriesOnAir.map(amount => amount > 0);
  }

  onSearch(text) {
    let areaId = this.selectedArea ? this.selectedArea.id : null;
    let experienceId = this.selectedExperience ? this.selectedExperience.id : null;
    console.log('search for %s in area %s with experience %s', text, areaId, experienceId);
    this.searchService.addSearch([text], areaId, experienceId);
  }

  onAreaSelected(area) {
    console.log('area', area);
  }

  onExperienceSelected(experience) {
    console.log('experiences', experience);
  }
}
