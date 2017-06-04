import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SearchInputComponent } from './search.input.component';

const components = [
  SearchInputComponent
  ];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: components
})
export class SearchModule { }
