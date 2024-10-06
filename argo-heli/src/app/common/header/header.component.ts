import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
