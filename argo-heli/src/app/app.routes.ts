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
    path: 'flights',
    redirectTo: 'flights/saentis',
  },
  {
    title: 'Flüge',
    path: 'flights/:flight',
    loadComponent: () => FlightsComponent,
    data: { showInMenu: 'flights' },
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
