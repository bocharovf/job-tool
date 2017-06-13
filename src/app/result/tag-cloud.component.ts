import {
  Component, AfterViewInit, ElementRef,
  Input, Output, EventEmitter, OnDestroy,
  OnChanges
} from '@angular/core';
import {CloudTag} from "./CloudTag";
import 'jquery';
import 'jqcloud-npm';


declare var $: JQueryStatic;

@Component({
  selector: '[resultTagCloud]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['tag-cloud.component.scss']
})
export class TagCloudComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() words: CloudTag[];
  @Input() width: number;
  @Input() height: number;
  @Input() autoResize: boolean = true;
  @Input() steps: number = 10;
  @Input() shape: 'elliptic' | 'rectangular' = 'elliptic';

  @Output() afterCloudRender = new EventEmitter<Element>();
  @Output() tagClick = new EventEmitter<CloudTag>();

  private _isInitialised: boolean = false;
  constructor(private parent: ElementRef) {

  }

  ngAfterViewInit(){
    let container: any = $(this.parent.nativeElement);
    this.words.forEach(w => {
      w.html = {class: 'action'};
      w.handlers = { click: event => this.tagClick.emit(w) };
    });
    container.jQCloud(this.words, {
      width: this.width,
      height: this.height,
      autoResize: this.autoResize,
      steps: this.steps,
      shape: this.shape,
      afterCloudRender: this.onAfterCloudRender.bind(this)
    });
    this._isInitialised = true;
  }

  onAfterCloudRender(element: Element) {
    this.afterCloudRender.emit(element);
  }

  ngOnChanges() {
    if (this._isInitialised) {
      let container: any = $(this.parent.nativeElement);
      container.jQCloud('update', this.words);
    }
  }

  ngOnDestroy() {
    let container: any = $(this.parent.nativeElement);
    container.jQCloud('destroy');
  }
}
