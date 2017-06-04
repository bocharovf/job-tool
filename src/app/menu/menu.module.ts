import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MenuItemComponent } from './menu-item.component';
import { NavigationComponent } from './navigation.component';
import { LogoComponent } from './logo.component';
import { SocialComponent } from './social.component';
import { SocialItemComponent } from './social-item.component';

const components = [
  NavigationComponent, LogoComponent, MenuItemComponent,
  SocialComponent, SocialItemComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: components
})
export class MenuModule { }
