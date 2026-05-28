import { Flight } from '../../page/flights/flight.interface';
import rigi from './rigi.json';
import uetliberg from './uetliberg.json';

export const allFlightsMap: Record<string, Flight> = {
  uetliberg,
  rigi,
};

export const allFlights: Flight[] = Object.values(allFlightsMap);
