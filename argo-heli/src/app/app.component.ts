import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
