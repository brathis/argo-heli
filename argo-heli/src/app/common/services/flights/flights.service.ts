import { Injectable } from '@angular/core';
import { allFlights, allFlightsMap } from '@content/flights';

@Injectable({ providedIn: 'root' })
export class FlightsService {

  readonly allFlights = allFlights;
  readonly allFlightsMap = allFlightsMap;

  getCheapestFlightCost() {
    const cheapestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.cost > currentValue.cost
        ? currentValue
        : previousValue
    );
    return cheapestFlight.cost;
  }

  getShortestFlightDuration() {
    const shortestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.duration > currentValue.duration
        ? currentValue
        : previousValue
    );
    return shortestFlight.duration;
  }

  getLongestFlightDuration() {
    const longestFlight = allFlights.reduce((previousValue, currentValue) =>
      previousValue === null || previousValue.duration < currentValue.duration
        ? currentValue
        : previousValue
    );
    return longestFlight.duration;
  }
}
