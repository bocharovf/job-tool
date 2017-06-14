import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress.component';
import { TagCloudComponent } from './tag-cloud.component';
import {TableViewComponent} from "./table-view.component";
import {ErrorComponent} from "./error.component";

const components = [
  ProgressComponent, TagCloudComponent,
  TableViewComponent, ErrorComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  exports: components
})
export class ResultsModule { }
