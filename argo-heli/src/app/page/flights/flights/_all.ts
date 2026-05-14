import { Flight } from '../flight.interface';
import { rigi } from './rigi';
import { uetliberg } from './uetliberg';

// The single source of truth for all available flights.
export const allFlightsMap: Record<string, Flight> = {
  uetliberg,
  rigi,
};

export const allFlights: Flight[] = Object.values(allFlightsMap);

export function getCheapestFlightCost() {
  const cheapestFlight = allFlights.reduce((previousValue, currentValue) =>
    previousValue === null || previousValue.cost > currentValue.cost
      ? currentValue
      : previousValue,
  );
  return cheapestFlight.cost;
}

export function getShortestFlightDuration() {
  const shortestFlight = allFlights.reduce((previousValue, currentValue) =>
    previousValue === null || previousValue.duration > currentValue.duration
      ? currentValue
      : previousValue,
  );
  return shortestFlight.duration;
}

export function getLongestFlightDuration() {
  const longestFlight = allFlights.reduce((previousValue, currentValue) =>
    previousValue === null || previousValue.duration < currentValue.duration
      ? currentValue
      : previousValue,
  );
  return longestFlight.duration;
}
