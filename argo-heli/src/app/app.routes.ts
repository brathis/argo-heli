import { Routes } from '@angular/router';
import { StartComponent } from './page/start/start.component';
import { FlightsComponent } from './page/flights/flights.component';
import { BookingComponent } from './page/booking/booking.component';
import { SaentisFlightComponent } from './page/flights/flights/saentis-flight/saentis-flight.component';
import { ChurfirstenFlightComponent } from './page/flights/flights/churfirsten-flight/churfirsten-flight.component';
import { ToediFlightComponent } from './page/flights/flights/toedi-flight/toedi-flight.component';

export const routes: Routes = [
  {
    title: 'Start',
    path: '',
    loadComponent: () => StartComponent,
  },
  {
    title: 'Flüge',
    path: 'flights',
    loadComponent: () => FlightsComponent,
    children: [
      {
        title: 'Säntis',
        path: 'saentis',
        loadComponent: () => SaentisFlightComponent,
      },
      {
        title: 'Churfirsten',
        path: 'churfirsten',
        loadComponent: () => ChurfirstenFlightComponent,
      },
      {
        title: 'Tödi',
        path: 'toedi',
        loadComponent: () => ToediFlightComponent,
      },
    ],
  },
  {
    title: 'Buchen',
    path: 'booking',
    loadComponent: () => BookingComponent,
  },
];
