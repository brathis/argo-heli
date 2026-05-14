import { ApplicationConfig, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { TranslateTitleStrategy } from './common/translate-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' })
    }),
    provideAppInitializer(
      async () => {
        const translate = inject(TranslateService);
        translate.addLangs(['de', 'en']);
        translate.setFallbackLang('de');
        const browserLang = translate.getBrowserLang();
        const lang = browserLang?.match(/de|en/) ? browserLang : 'de';
        return firstValueFrom(translate.use(lang)).then(() => undefined);
      }),
    { provide: TitleStrategy, useClass: TranslateTitleStrategy }
  ]
};
