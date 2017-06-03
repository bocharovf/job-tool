import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './sections/menu.component';
import { AboutComponent } from './sections/about.component';
import { StartupComponent } from './sections/startup.component';
import { StatisticsComponent } from './sections/statistics.component';
import { MenuItemComponent } from './menu/menu-item.component';
import { NavigationComponent } from './menu/navigation.component';
import { LogoComponent } from './menu/logo.component';
import { SocialComponent } from './menu/social.component';
import { SocialItemComponent } from './menu/social-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent, AboutComponent, StartupComponent,
    NavigationComponent, LogoComponent, MenuItemComponent,
    SocialComponent, SocialItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
