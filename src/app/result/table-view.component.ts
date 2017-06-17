import {Component, Input} from '@angular/core';
import {SearchModel} from "../search/SearchModel";

@Component({
    selector: 'result-table-view',
    template: `
<div class="table-responsive table-container">
  <table class="table table-striped table-hover table-bordered">
    <tr>
      <th>№</th>
      <th>Запрос</th>
      <th>Город</th>
      <th>Опыт</th>
      <th>Кол-во вакансий</th>
      <th>Средняя з.п.</th>
    </tr>
    <tr *ngFor="let result of results; index as i">
      <td>{{i+1}}</td>
      <td class="strong-text">
        <div class="circle" [style.background-color]="result.color"></div>
        {{result.query}}
      </td>
      <td [class.default-text]="!result.area">
        {{result.area ? result.area.name : 'любой'}}
      </td>
      <td [class.default-text]="!result.experience">
        {{result.experience ? result.experience.name : 'любой'}}
        </td>
      <td>{{result.stat.amount}}</td>
      <td class="strong-text">
        {{result.stat.avgSalary.toFixed(0)}} руб.
      </td>            
    </tr>  
  </table>
</div>
`,
    styleUrls: ['table-view.component.scss']
})
export class TableViewComponent {
  @Input() results: SearchModel[];
}
