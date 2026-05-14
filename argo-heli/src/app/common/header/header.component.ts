import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav/nav.component';

@Component({
    selector: 'app-header',
    imports: [LogoComponent, NavComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
