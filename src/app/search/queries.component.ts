import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SearchModel} from "./SearchModel";

@Component({
    selector: 'search-queries',
    template: `
    <span 
      *ngFor="let query of queries"
      [style.background-color]="query.color"
      class="label query-label">
        {{query.query}} 
      <span 
        (click)="removeQuery.emit(query)"
        class="glyphicon glyphicon-remove icon-remove"> 
      </span>
    </span>
    `,
    styles: [
      '.query-label { font-size: 16px; padding: 10px; margin: 10px; }',
      '.icon-remove { cursor: pointer; }'
    ]
})
export class SearchQueriesComponent {
  @Input() queries: SearchModel[];
  @Output() removeQuery = new EventEmitter<SearchModel>();
}
