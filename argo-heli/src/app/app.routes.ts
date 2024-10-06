import { Routes } from '@angular/router';
import { StartComponent } from './page/start/start.component';
import { FlightsComponent } from './page/flights/flights.component';
import { BookingComponent } from './page/booking/booking.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => StartComponent,
  },
  {
    path: 'flights',
    loadComponent: () => FlightsComponent,
  },
  {
    path: 'booking',
    loadComponent: () => BookingComponent,
  },
];
