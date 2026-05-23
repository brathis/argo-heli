import { Component, inject } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { langChildRoutes } from '../../../app.routes';
import { LangService } from '../../i18n/lang.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  readonly currentLang = inject(LangService).currentLang;
  readonly topLevelRoutes: Route[] = [];

  constructor() {
    for (const route of langChildRoutes) {
      const showInMenu = route.data?.['showInMenu'];
      if (showInMenu) {
        const path = showInMenu === true ? route.path : showInMenu;
        this.topLevelRoutes.push({ ...route, path });
      }
    }
  }
}
