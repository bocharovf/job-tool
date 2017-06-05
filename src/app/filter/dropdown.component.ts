import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'filter-dropdown',
    template: `
<div class="btn-group" dropdown style="width: 100%">
  <button dropdownToggle 
    type="button"
    style="width: 100%"
    class="btn dropdown-toggle">
    {{selected ? selected[displayName] : ''}} <span class="caret"></span>
  </button>
  <ul *dropdownMenu class="dropdown-menu" role="menu">
    <li *ngFor="let item of items" role="menuitem">
      <a class="dropdown-item" (click)="onSelected(item)">{{item[displayName]}}</a>
     </li>
  </ul>
</div>  
`,
  styles: ['a.dropdown-item { cursor: pointer }']
})
export class DropdownComponent {
  @Input() items: any[];
  @Input() displayName: string = 'name';

  @Input() selected:any;
  @Output() selectedChange = new EventEmitter<any>();

  onSelected(item: any) {
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
