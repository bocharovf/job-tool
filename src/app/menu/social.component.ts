import {Component, Input, AfterViewInit} from '@angular/core';

declare var stLight: any;

@Component({
    selector: 'menu-social',
    template: `<ng-content></ng-content>`,
    styleUrls: ['social.component.scss']
})
export class SocialComponent implements AfterViewInit {

  @Input() publisher: string;
  @Input() publisherGA: string;

  ngAfterViewInit() {
    stLight.options({
      publisher: this.publisher,
      publisherGA: this.publisherGA,
      doNotHash: false,
      doNotCopy: false,
      hashAddressBar: false});

  }
}
