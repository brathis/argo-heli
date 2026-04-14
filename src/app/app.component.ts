import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';

@Component({
    selector: 'app-root',
    imports: [LogoComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}
