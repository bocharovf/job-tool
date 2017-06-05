import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AutocompleteComponent } from './autocomplete.component';
import { DropdownComponent } from './dropdown.component';

const components = [
  AutocompleteComponent, DropdownComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    FormsModule,
    TypeaheadModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  exports: components
})
export class FilterModule { }
