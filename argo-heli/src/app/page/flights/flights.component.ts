import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../common/button/button.component';
import {
  SecondaryNavComponent,
  SecondaryRoute,
} from '../../common/secondary-nav/secondary-nav.component';
import { HeroLayerDirective } from './common/hero/hero-layer.directive';
import { HeroComponent } from './common/hero/hero.component';
import { HighlightsComponent } from './common/highlights/highlights.component';
import { PriceTagComponent } from './common/price-tag/price-tag.component';
import { Flight } from './flight.interface';
import { allFlights, allFlightsMap } from './flights/_all';
import { FlightSectionComponent } from "./flight-section/flight-section.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    SecondaryNavComponent,
    RouterOutlet,
    HeroComponent,
    PriceTagComponent,
    ButtonComponent,
    CommonModule,
    HighlightsComponent,
    HeroLayerDirective,
    NgOptimizedImage,
    FlightSectionComponent
],
  templateUrl: './flights.component.html',
})
export class FlightsComponent {
  flight = input<string>();

  routes = allFlights as SecondaryRoute[];
  // TODO:  Switching back and forth is simply because NgOptimizedImage cannot handle changing "width" and "height" attributes,
  //        forcing us to ensure that a new component is created each time the user selects a different flight.
  //        Maybe there's a better way?
  flightA: Flight | null = null;
  flightB: Flight | null = null;

  constructor() {
    effect(() => {
      const flightId = this.flight();
      if (flightId === undefined) {
        return;
      }
      if (!this.flightA && !this.flightB) {
        this.flightA = allFlightsMap[flightId];
      } else if (!this.flightA) {
        this.flightA = allFlightsMap[flightId];
        this.flightB = null;
      } else {
        this.flightB = allFlightsMap[flightId];
        this.flightA = null;
      }
    });
  }
}
