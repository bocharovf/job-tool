import {
  Component, EventEmitter, Output, Input, ElementRef, ViewChild, AfterViewChecked, HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {TypeaheadMatch} from "ngx-bootstrap";
import 'rxjs/add/observable/of';

@Component({
    selector: 'filter-autocomplete',
    template: `
  <button 
    *ngIf="!edit" 
    type="button" 
    class="btn"
    style="width: 100%;"
    (click)="onPreviewClick($event)">
    {{selected ? selected : placeholder}} <span class="glyphicon glyphicon-globe"></span>
  </button>
  
  <input
    #input
    *ngIf="edit"
    type="text"
    class="form-control"
    style="width: 100%; text-align: center;"
    [placeholder]="placeholder"
    [typeahead]="dataSource"
    [typeaheadOptionField]="displayName"
    (typeaheadOnSelect)="onSelect($event)"
    (blur)="onBlur()"
    [(ngModel)]="selected" />
`
})
export class AutocompleteComponent implements AfterViewChecked{
  @Input() placeholder: string;
  @Input() items: any[];
  @Input() displayName: string = 'name';

  @Output() selectedChange = new EventEmitter<any>();

  private selected:any;
  private dataSource: Observable<any>;
  private edit: boolean;

  @ViewChild('input') private el:ElementRef;

  constructor() {
    this.dataSource = Observable.create(
      (observer: any) => observer.next(this.selected)
    ).mergeMap((token: string) =>
      this.getStatesAsObservable(token));
  }

  onPreviewClick() {
    this.edit = true;
  }

  onBlur() {
    this.edit = false;
  }

  private prevEdit = false;
  ngAfterViewChecked() {
    if (!this.prevEdit && this.edit)
      this.el.nativeElement.focus();
  }

  onSelect(e: TypeaheadMatch): void {
    this.selectedChange.emit(e.item);
    this.edit = false;
  }

  private getStatesAsObservable(token: string): Observable<any> {
    return Observable.of(
      this.items.filter(
        (state: any) => state[this.displayName]
                          .toLowerCase()
                          .startsWith(token.toLowerCase())
      )
    );
  }
}
