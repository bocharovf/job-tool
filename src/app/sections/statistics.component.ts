import {Component} from '@angular/core';

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsSectionComponent {

  public areas = [{name:'Москва', id:1}, {name:'Екатеринбург', id: 2}];
  public experience = [{name: 'Без опыта', id:1}, {name: 'Более 1 года', id:2}];
  public selectedExperience: any;

  constructor() {
    this.selectedExperience = this.experience[0];
  }

  public onSearch(text) {
    console.log('search for', text);
  }

  public onAreaSelected(area) {
    console.log('area', area);
  }

  public onExperienceSelected(experience) {
    console.log('experience', experience);
  }
}
