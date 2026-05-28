import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LangService, SUPPORTED_LANGS } from '../../i18n/lang.service';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent {
  private readonly router = inject(Router);
  private readonly langService = inject(LangService);

  readonly languages = SUPPORTED_LANGS;

  get currentLang(): string {
    return this.langService.currentLang();
  }

  switchTo(lang: string): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const primary = urlTree.root.children['primary'];
    if (primary?.segments.length > 0) {
      primary.segments[0].path = lang;
    }
    this.router.navigateByUrl(urlTree);
  }
}
