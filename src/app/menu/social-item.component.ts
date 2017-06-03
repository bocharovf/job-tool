import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-social-item',
    template: `
      <span class='{{buttonClass}}' 
          [attr.displayText]="displayText"></span>
    `,
  styleUrls: ['social-item.component.scss']
})
export class SocialItemComponent {
  @Input() displayText: string;
  @Input() socialNetwork: string;
  @Input() isLarge: boolean;

  get buttonClass(): string {
    return `st_${this.socialNetwork}` + (this.isLarge ? '_large' : '');
  }

}

