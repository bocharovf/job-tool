import {
  Component, EventEmitter, Output, Input, ElementRef, ViewChild, AfterViewChecked, HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {TypeaheadMatch} from "ngx-bootstrap";
import 'rxjs/add/observable/of';
import {FilterItem} from "./FilterItem";

@Component({
    selector: 'filter-autocomplete',
    template: `
  <button 
    *ngIf="!_edit" 
    type="button" 
    class="btn"
    [class.btn-primary]="selected"
    style="width: 100%;"
    (click)="onPreviewClick($event)">
      <span class="btn-content">
        <span class="glyphicon glyphicon-globe"></span> 
        {{selected ? selected.name : title}}
      </span>
  </button>
  
  <input
    #input
    *ngIf="_edit"
    type="text"
    class="form-control"
    style="width: 100%; text-align: center;"
    [placeholder]="title"
    [typeahead]="dataSource"
    [typeaheadOptionField]="'name'"
    (typeaheadOnSelect)="onSelect($event)"
    (blur)="onBlur()"
    [(ngModel)]="selected" />
`,
  styles: ['.btn-content { text-overflow: ellipsis; overflow: hidden; display: block; }']
})
export class AutocompleteComponent implements AfterViewChecked{
  @Input() title: string;
  @Input() items: FilterItem[];

  @Output() selectedChange = new EventEmitter<FilterItem>();

  @Input() selected:FilterItem;
  private dataSource: Observable<FilterItem>;
  _edit: boolean;

  @ViewChild('input') private el:ElementRef;

  constructor() {
    this.dataSource = Observable.create(
      (observer: any) => observer.next(this.selected || '')
    ).mergeMap((token: string) =>
      this.getStatesAsObservable(token));
  }

  onPreviewClick() {
    this._edit = true;
  }

  onBlur() {
    this._edit = false;
  }

  private prevEdit = false;
  ngAfterViewChecked() {
    if (!this.prevEdit && this._edit)
      this.el.nativeElement.focus();
  }

  onSelect(e: TypeaheadMatch): void {
    this.selectedChange.emit(e.item);
    this._edit = false;
  }

  private getStatesAsObservable(token: string): Observable<any> {
    return Observable.of(
      this.items.filter(
        (state: FilterItem) => state.name
                          .toLowerCase()
                          .startsWith(token.toLowerCase())
      )
    );
  }
}
