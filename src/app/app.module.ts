import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './menu/menu.module';
import { SearchModule } from './search/search.module';
import { FilterModule } from './filter/filter.module';
import { ResultsModule } from './result/results.module';

import { AppComponent } from './app.component';
import { MenuSectonComponent } from './sections/menu.component';
import { AboutSectionComponent } from './sections/about.component';
import { StartupSectionComponent } from './sections/startup.component';
import { StatisticsSectionComponent } from './sections/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSectonComponent,
    AboutSectionComponent,
    StartupSectionComponent,
    StatisticsSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MenuModule,
    SearchModule,
    FilterModule,
    ResultsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
