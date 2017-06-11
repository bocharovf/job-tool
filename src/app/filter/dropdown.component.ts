import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FilterItem} from "./FilterItem";

@Component({
    selector: 'filter-dropdown',
    template: `
<div class="btn-group" dropdown style="width: 100%">
  <button dropdownToggle 
    type="button"
    style="width: 100%"
    class="btn dropdown-toggle"
    [class.btn-primary]="selected">
    <span class="btn-content">{{title}}: {{selected ? selected[displayName] : defaultItem}} 
      <span class="caret"></span>
    </span>
  </button>
  <ul *dropdownMenu class="dropdown-menu" role="menu">
    <li role="menuitem">
      <a class="dropdown-item" (click)="onSelected(null)">{{defaultItem}}</a>
    </li>
    <li *ngFor="let item of items" role="menuitem">
      <a class="dropdown-item" (click)="onSelected(item)">{{item[displayName]}}</a>
     </li>
  </ul>
</div>  
`,
  styles: [
    'a.dropdown-item { cursor: pointer }',
    '.btn-content { text-overflow: ellipsis; overflow: hidden; display: block; }'
  ]
})
export class DropdownComponent {
  @Input() items: FilterItem[];
  @Input() displayName: string = 'name';
  @Input() title: string = '';
  @Input() defaultItem: string = '';

  @Input() selected:FilterItem;
  @Output() selectedChange = new EventEmitter<FilterItem>();

  onSelected(item: FilterItem) {
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
