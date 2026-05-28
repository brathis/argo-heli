import { Injectable, signal } from '@angular/core';

export type Language = 'de' | 'en';
export const SUPPORTED_LANGS = ['de', 'en'];
export const DEFAULT_LANG = 'de';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly _currentLang = signal<Language>(this.detectLangFromUrl());
  readonly currentLang = this._currentLang.asReadonly();

  private detectLangFromUrl(): Language {
    if (typeof window === 'undefined') {
      return DEFAULT_LANG;
    }
    const match = window.location.pathname.match(/^\/(de|en)(\/|$)/);
    return match ? (match[1] as Language) : DEFAULT_LANG;
  }

  setLang(lang: Language): void {
    this._currentLang.set(lang);
  }
}
