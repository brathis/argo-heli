import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { langGuard } from './common/i18n/lang.guard';
import { BookingComponent } from './page/booking/booking.component';
import { SuccessComponent } from './page/booking/success/success.component';
import { FlightsComponent } from './page/flights/flights.component';
import { ImprintComponent } from './page/imprint/imprint.component';
import { PrivacyPolicyComponent } from './page/privacy-policy/privacy-policy.component';
import { StartComponent } from './page/start/start.component';

export const langChildRoutes: Routes = [
  {
    title: 'nav.start',
    path: '',
    loadComponent: () => StartComponent,
    data: { showInMenu: true, descriptionKey: 'meta.desc.start' },
  },
  {
    path: 'flights',
    redirectTo: 'flights/uetliberg',
  },
  {
    title: 'nav.flights',
    path: 'flights/:flight',
    loadComponent: () => FlightsComponent,
    data: { showInMenu: 'flights', descriptionKey: 'meta.desc.flights' },
  },
  {
    title: 'nav.booking',
    path: 'booking',
    loadComponent: () => BookingComponent,
    data: { showInMenu: true, descriptionKey: 'meta.desc.booking' },
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
    data: { descriptionKey: 'meta.desc.imprint' },
  },
  {
    title: 'footer.privacy-policy',
    path: 'privacy-policy',
    loadComponent: () => PrivacyPolicyComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

function browserLangRedirect(): string {
  const translate = inject(TranslateService);
  const browserLang = translate.getBrowserLang();
  return browserLang?.match(/de|en/) ? browserLang : 'de';
}

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [langGuard],
    children: langChildRoutes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: browserLangRedirect,
  },
  {
    path: '**',
    redirectTo: browserLangRedirect,
  },
];
