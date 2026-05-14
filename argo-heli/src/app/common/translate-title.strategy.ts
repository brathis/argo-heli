import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslateTitleStrategy extends TitleStrategy {
  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  private lastState: RouterStateSnapshot | null = null;

  constructor() {
    super();
    this.translate.onLangChange.subscribe(() => {
      if (this.lastState) this.applyTitle(this.lastState);
    });
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    this.lastState = routerState;
    this.applyTitle(routerState);
  }

  private applyTitle(state: RouterStateSnapshot): void {
    const key = this.buildTitle(state);
    if (key) this.title.setTitle(this.translate.instant(key));
  }
}
