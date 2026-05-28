import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslateTitleStrategy extends TitleStrategy {
  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private lastState: RouterStateSnapshot | null = null;

  constructor() {
    super();
    this.translate.onLangChange.subscribe(() => {
      if (this.lastState) {
        this.applyTitle(this.lastState);
      }
    });
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    this.lastState = routerState;
    this.applyTitle(routerState);
  }

  private applyTitle(state: RouterStateSnapshot): void {
    const key = this.buildTitle(state);
    if (key) {
      this.title.setTitle(this.translate.instant(key));
    }

    const descKey = this.getRouteData(state.root, 'descriptionKey');
    if (descKey) {
      this.meta.updateTag({
        name: 'description',
        content: this.translate.instant(descKey),
      });
    } else {
      this.meta.removeTag('name="description"');
    }

    this.setCanonical(environment.siteUrl + state.url);
  }

  private getRouteData(
    route: ActivatedRouteSnapshot,
    key: string,
  ): string | undefined {
    let current: ActivatedRouteSnapshot | null = route;
    let result: string | undefined;
    while (current) {
      if (current.data[key]) {
        result = current.data[key];
      }
      current = current.firstChild;
    }
    return result;
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
