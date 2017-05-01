import { Component, Input} from '@angular/core';

@Component({
    selector: 'li[appMenuItem]',
    template: `
        <span class="mobile-hidden nav-link">{{text}}</span>
        <span class="desktop-hidden nav-icon glyphicon" [ngClass]="icon">
        </span>
    `,
  styleUrls: ['menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() text: string;
  @Input() icon: string;
}
