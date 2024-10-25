import { Routes } from '@angular/router';
import { BookingComponent } from './page/booking/booking.component';
import { FlightsComponent } from './page/flights/flights.component';
import { StartComponent } from './page/start/start.component';

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
        path: '',
        redirectTo: '/flights/saentis',
        pathMatch: 'full',
      },
      {
        title: 'Säntis',
        path: 'saentis',
        loadComponent: () => FlightsComponent,
        data: { flightId: 'saentis' },
      },
      {
        title: 'Churfirsten',
        path: 'churfirsten',
        loadComponent: () => FlightsComponent,
        data: { flightId: 'churfirsten' },
      },
      {
        title: 'Tödi',
        path: 'toedi',
        loadComponent: () => FlightsComponent,
        data: { flightId: 'toedi' },
      },
    ],
  },
  {
    title: 'Buchen',
    path: 'booking',
    loadComponent: () => BookingComponent,
  },
];
