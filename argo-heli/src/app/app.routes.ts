import { Routes } from '@angular/router';
import { BookingComponent } from './page/booking/booking.component';
import { SuccessComponent } from './page/booking/success/success.component';
import { FlightsComponent } from './page/flights/flights.component';
import { ImprintComponent } from './page/imprint/imprint.component';
import { PrivacyPolicyComponent } from './page/privacy-policy/privacy-policy.component';
import { StartComponent } from './page/start/start.component';

export const routes: Routes = [
  {
    title: 'nav.start',
    path: '',
    loadComponent: () => StartComponent,
    data: { showInMenu: true },
  },
  {
    path: 'flights',
    redirectTo: 'flights/uetliberg',
  },
  {
    title: 'nav.flights',
    path: 'flights/:flight',
    loadComponent: () => FlightsComponent,
    data: { showInMenu: 'flights' },
  },
  {
    title: 'nav.booking',
    path: 'booking',
    loadComponent: () => BookingComponent,
    data: { showInMenu: true },
  },
  {
    title: 'booking-success.title',
    path: 'booking/success',
    loadComponent: () => SuccessComponent,
  },
  {
    title: 'footer.imprint',
    path: 'imprint',
    loadComponent: () => ImprintComponent,
  },
  {
    title: 'footer.privacy-policy',
    path: 'privacy-policy',
    loadComponent: () => PrivacyPolicyComponent,
  },
];
