import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { SearchInputComponent } from './search.input.component';

const components = [
  SearchInputComponent
  ];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  exports: components
})
export class SearchModule { }
