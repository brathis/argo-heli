import { Language } from '../../core/i18n/lang.service';

export interface Flight {
  /** Internal identifier of the flight for use in URLs, HTML attributes, etc. */
  id: string;

  /** The name of the flight. */
  title: string;

  /** The flight cost per person, in CHF. */
  cost: number;

  /** The total cost of the flight, in CHF. */
  totalCost: number;

  /** The approximate flight duration in minutes. */
  duration: number;

  /** The maximum number of passengers that can be brought along. */
  maxPassengers: number;

  /** SVG source of the map depicting the flight route. */
  mapSvg: string;

  /** A short textual description of the flight's highlights. */
  synopsis: Record<Language, string>;

  /** Optional override for hero text color. */
  textColor?: string;
}
