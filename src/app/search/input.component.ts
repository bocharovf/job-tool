import {Component, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {TypeaheadMatch} from "ngx-bootstrap";
import 'rxjs/add/observable/of';

@Component({
    selector: 'search-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})
export class SearchInputComponent {
  @Input() public words:string[];
  @Output() public search = new EventEmitter<string>();

  public dataSource: Observable<any>;
  public selected: string;

  public constructor(private elementRef: ElementRef) {
    this.dataSource = Observable.create(
                          (observer: any) => observer.next(this.selected)
                        ).mergeMap((token: string) =>
                          this.getStatesAsObservable(token));
  }

  public onSelect(e: TypeaheadMatch): void {
    this.EmitSearch(this.selected);
  }

  public onEnter(e: KeyboardEvent): void {
    if (!this.isDropdownOpen())
      this.EmitSearch(this.selected);
  }

  public onSearchBtnClick(e: MouseEvent) {
    this.EmitSearch(this.selected);
  }

  private EmitSearch(text: string) {
    if (!text.trim()) return;
    this.search.emit(text);
    this.selected = '';
  }

  private getStatesAsObservable(token: string): Observable<any> {
    return Observable.of(
      this.words.filter((state: string) => state.toLowerCase()
                                                .startsWith(token.toLowerCase()))
    );
  }

  /**
   * Work around to check if drop down list of typeahead is open
   * @returns {boolean}
   */
  private isDropdownOpen(): boolean {
    let element = this.elementRef.nativeElement;
    let typeahead = element.getElementsByTagName('typeahead-container');
    return typeahead.length > 0
            ? typeahead[0].className.indexOf('open') > -1
            : false;
  }
}
