
import { Component, effect, input } from '@angular/core';
import { FlightSectionComponent } from './_presentational/flight-section/flight-section.component';
import {
  SecondaryNavComponent,
  SecondaryRoute,
} from './_presentational/secondary-nav/secondary-nav.component';
import { Flight } from './flight.interface';
import { allFlights, allFlightsMap } from './flights/_all';

@Component({
    selector: 'app-flights',
    imports: [SecondaryNavComponent, FlightSectionComponent],
    templateUrl: './flights.component.html'
})
export class FlightsComponent {
  flight = input<string>();

  routes = allFlights.map((flight) => ({
    title: flight.title,
    path: `/flights/${flight.id}`,
  })) as SecondaryRoute[];
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
