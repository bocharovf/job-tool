import {Component} from '@angular/core';

@Component({
    selector: 'nav[menuNavigation]',
    template: `
  <nav>
    <ul>
      <ng-content></ng-content>
    </ul>
  </nav>
`,
    styleUrls: ['navigation.component.scss']
})
export class NavigationComponent {

}
