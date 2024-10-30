import { Routes } from '@angular/router';
import { BookingComponent } from './page/booking/booking.component';
import { SuccessComponent } from './page/booking/success/success.component';
import { FlightsComponent } from './page/flights/flights.component';
import { StartComponent } from './page/start/start.component';

export const routes: Routes = [
  {
    title: 'Start',
    path: '',
    loadComponent: () => StartComponent,
    data: { showInMenu: true },
  },
  {
    title: 'Flüge',
    path: 'flights',
    loadComponent: () => FlightsComponent,
    data: { showInMenu: true },
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
        data: { flightId: 'saentis', showInMenu: true },
      },
      {
        title: 'Churfirsten',
        path: 'churfirsten',
        loadComponent: () => FlightsComponent,
        data: { flightId: 'churfirsten', showInMenu: true },
      },
      {
        title: 'Tödi',
        path: 'toedi',
        loadComponent: () => FlightsComponent,
        data: { flightId: 'toedi', showInMenu: true },
      },
    ],
  },
  {
    title: 'Buchen',
    path: 'booking',
    loadComponent: () => BookingComponent,
    data: { showInMenu: true },
  },
  {
    title: 'Danke für Ihre Anfrage!',
    path: 'booking/success',
    loadComponent: () => SuccessComponent,
  },
];
