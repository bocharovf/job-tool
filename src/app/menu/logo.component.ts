import {Component, Input} from '@angular/core';

@Component({
    selector: 'menu-logo',
    template: `
    <img [src]="src" [alt]="alt"/>
`,
    styleUrls: ['logo.component.scss']
})
export class LogoComponent {
  @Input() src: string;
  @Input() alt: string;
}
