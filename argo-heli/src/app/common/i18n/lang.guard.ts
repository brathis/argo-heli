import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { SUPPORTED_LANGS, LangService, DEFAULT_LANG } from './lang.service';

export const langGuard: CanActivateFn = (route, state) => {
  const translate = inject(TranslateService);
  const langService = inject(LangService);
  const router = inject(Router);

  const lang = route.paramMap.get('lang');

  if (!lang || !SUPPORTED_LANGS.includes(lang)) {
    const urlTree = router.parseUrl(state.url);
    const primary = urlTree.root.children['primary'];
    if (primary?.segments.length > 0) {
      primary.segments[0].path = DEFAULT_LANG;
    }
    return urlTree;
  }

  langService.setLang(lang);
  return firstValueFrom(translate.use(lang)).then(() => true);
};
