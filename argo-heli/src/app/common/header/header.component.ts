import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav/nav.component';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, NavComponent, LangSwitcherComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
