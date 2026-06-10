import { RenderMode, ServerRoute } from '@angular/ssr';
import { SUPPORTED_LANGS } from './core/i18n/lang.service';
import { allFlightsMap } from '@content/flights';

const langParams = async () => SUPPORTED_LANGS.map((lang) => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  // Root redirects use navigator.language — keep client-side
  { path: '', renderMode: RenderMode.Client },

  // Home page for each language
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langParams,
  },

  // /flights redirects to first flight — no content to render
  { path: ':lang/flights', renderMode: RenderMode.Client },

  // Individual flight pages
  {
    path: ':lang/flights/:flight',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      SUPPORTED_LANGS.flatMap((lang) =>
        Object.keys(allFlightsMap).map((flight) => ({ lang, flight })),
      ),
  },

  // Booking form
  {
    path: ':lang/booking',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langParams,
  },

  // Post-booking success page — transactional, not worth pre-rendering
  { path: ':lang/booking/success', renderMode: RenderMode.Client },

  // Voucher order form
  {
    path: ':lang/voucher',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langParams,
  },

  // Voucher order success page — transactional, not worth pre-rendering
  { path: ':lang/voucher/success', renderMode: RenderMode.Client },

  // Legal pages
  {
    path: ':lang/imprint',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langParams,
  },
  {
    path: ':lang/privacy-policy',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langParams,
  },

  // Catch-all redirects — keep client-side
  { path: '**', renderMode: RenderMode.Client },
];
