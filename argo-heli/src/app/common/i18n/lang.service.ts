import { Injectable, signal } from '@angular/core';

export const SUPPORTED_LANGS = ['de', 'en'];
export const DEFAULT_LANG = 'de';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly _currentLang = signal<string>(this.detectLangFromUrl());
  readonly currentLang = this._currentLang.asReadonly();

  private detectLangFromUrl(): string {
    if (typeof window === 'undefined') {
      return DEFAULT_LANG;
    }
    const match = window.location.pathname.match(/^\/(de|en)(\/|$)/);
    return match ? match[1] : DEFAULT_LANG;
  }

  setLang(lang: string): void {
    this._currentLang.set(lang);
  }
}
