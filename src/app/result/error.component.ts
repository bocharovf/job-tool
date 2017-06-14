import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'result-error',
    template: `
<div 
  *ngIf="error"
  class="alert alert-danger alert-dismissible" 
  role="alert">
  
  <button 
    type="button" 
    class="close" 
    data-dismiss="alert" 
    aria-label="Close"
    (click)="dismiss.emit()">
    <span aria-hidden="true">&times;</span>
  </button>
  {{error.message}}
</div>
`
})
export class ErrorComponent {
  @Input() error: Error;
  @Output() dismiss = new EventEmitter<void>();
}
