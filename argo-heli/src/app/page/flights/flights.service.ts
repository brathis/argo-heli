import { inject, Injectable } from '@angular/core';
import { allFlights, allFlightsMap } from '@content/flights';
import { ActivatedRoute } from '@angular/router';
import { Flight } from './flight.interface';

@Injectable({ providedIn: 'root' })
export class FlightsService {
  private readonly _route = inject(ActivatedRoute);
  readonly allFlights = allFlights;
  readonly allFlightsMap = allFlightsMap;

  getCheapestFlightCost() {
    const cheapestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.cost > currentValue.cost
        ? currentValue
        : previousValue,
    );
    return cheapestFlight.cost;
  }

  getShortestFlightDuration() {
    const shortestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.duration > currentValue.duration
        ? currentValue
        : previousValue,
    );
    return shortestFlight.duration;
  }

  getLongestFlightDuration() {
    const longestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.duration < currentValue.duration
        ? currentValue
        : previousValue,
    );
    return longestFlight.duration;
  }

  getFlightFromQueryParam(): Flight | null {
    const flightId = this._route.snapshot.queryParamMap.get('flight');
    if (!flightId) {
      return null;
    }
    return allFlightsMap[flightId];
  }
}
