import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecondaryNavComponent } from '../../common/secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [SecondaryNavComponent, RouterOutlet],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {}
