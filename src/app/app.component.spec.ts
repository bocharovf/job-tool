import { TestBed, async } from '@angular/core/testing';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenuComponent, AboutComponent, StartupComponent,
        NavigationComponent, LogoComponent, MenuItemComponent,
        SocialComponent, SocialItemComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
