import {Component} from '@angular/core';

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsSectionComponent {

  public onSearch(text) {
    console.log('search for', text);
  }

}
