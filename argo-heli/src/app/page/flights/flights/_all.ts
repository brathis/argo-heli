import { Flight } from '../flight.interface';
import { churfirsten } from './churfirsten';
import { saentis } from './saentis';
import { toedi } from './toedi';

// The single source of truth for all available flights.
export const allFlights: Flight[] = [saentis, churfirsten, toedi];
export const allFlightsMap: { [key: string]: Flight } = {
  saentis,
  churfirsten,
  toedi,
};
