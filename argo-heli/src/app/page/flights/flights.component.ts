import { Component } from '@angular/core';
import { FlightsNavComponent } from './common/flights-nav/flights-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [FlightsNavComponent, RouterOutlet],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {}
