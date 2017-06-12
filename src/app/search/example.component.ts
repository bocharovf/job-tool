import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'search-example',
    template: `
  <div>
    <span>Например сравните: </span>
    <span
      class="action-link"
      (click)="onSearch.emit(example)">
      {{example}}  
    </span>
  </div>
`,
    styleUrls: ['example.component.scss']
})
export class SearchExampleComponent {
  @Input() example: string;
  @Output() onSearch = new EventEmitter<string>();
}
