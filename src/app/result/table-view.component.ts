import {Component, Input} from '@angular/core';
import {SearchModel} from "../search/SearchModel";

@Component({
    selector: 'result-table-view',
    template: `
<div class="table-responsive table-container">
  <table class="table-striped">
    <tr>
      <th>№</th>
      <th>Запрос</th>
      <th>Кол-во вакансий</th>
      <th>Средняя з.п.</th>
    </tr>
    <tr *ngFor="let result of results">
      <td>1</td>
      <td>
        {{result.query}} 
        {{result.area ? result.area.name : ''}} 
        {{result.experience ? result.experience.name : ''}}
      </td>
      <td>{{result.stat.amount}}</td>
      <td>{{result.stat.avgSalary.toFixed(0)}}</td>            
    </tr>  
  </table>
</div>
`,
    styleUrls: ['table-view.component.scss']
})
export class TableViewComponent {
  @Input() results: SearchModel[];
}
