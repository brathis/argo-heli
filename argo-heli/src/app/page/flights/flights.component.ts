import { Component, effect, inject, input } from '@angular/core';
import { LangService } from '../../core/i18n/lang.service';
import { FlightSectionComponent } from './components/flight-section/flight-section.component';
import {
  SecondaryNavComponent,
  SecondaryRoute,
} from './components/secondary-nav/secondary-nav.component';
import { Flight } from './flight.interface';
import { FlightsService } from './flights.service';

@Component({
  selector: 'app-flights',
  imports: [SecondaryNavComponent, FlightSectionComponent],
  templateUrl: './flights.component.html',
})
export class FlightsComponent {
  private readonly flightsService = inject(FlightsService);
  private readonly lang = inject(LangService).currentLang;
  flight = input<string>();

  get routes(): SecondaryRoute[] {
    return this.flightsService.allFlights.map((flight) => ({
      title: flight.title,
      path: `/${this.lang()}/flights/${flight.id}`,
    }));
  }
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
        this.flightA = this.flightsService.allFlightsMap[flightId];
      } else if (!this.flightA) {
        this.flightA = this.flightsService.allFlightsMap[flightId];
        this.flightB = null;
      } else {
        this.flightB = this.flightsService.allFlightsMap[flightId];
        this.flightA = null;
      }
    });
  }
}
