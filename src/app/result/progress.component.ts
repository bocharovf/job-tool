import {Component, Input} from '@angular/core';

@Component({
    selector: 'result-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['progress.component.scss']
})
export class ProgressComponent {
  @Input() displayText: string;
}
