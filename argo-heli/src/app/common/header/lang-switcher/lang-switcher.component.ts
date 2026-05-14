import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent {
  private translateService = inject(TranslateService);

  readonly languages = ['de', 'en'] as const;

  get currentLang(): string {
    return this.translateService.getCurrentLang();
  }

  switchTo(lang: string): void {
    this.translateService.use(lang);
  }
}
