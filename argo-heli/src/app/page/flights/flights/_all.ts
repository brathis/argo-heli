import { Flight } from '../flight.interface';
import { rigi } from './rigi';
import { uetliberg } from './uetliberg';

// The single source of truth for all available flights.
export const allFlightsMap: { [key: string]: Flight } = {
  uetliberg,
  rigi,
};
export const allFlights: Flight[] = Object.values(allFlightsMap);
