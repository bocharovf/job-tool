import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SearchService } from './search.service';
import { SearchInputComponent } from './input.component';
import { SearchExampleComponent } from './example.component';
import { DictionaryService } from "./dictionary.service";
import {SearchQueriesComponent} from "./queries.component";

const components = [
  SearchInputComponent, SearchExampleComponent,
  SearchQueriesComponent
  ];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [SearchService, DictionaryService],
  exports: components
})
export class SearchModule { }
