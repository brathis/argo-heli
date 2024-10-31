import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private _routerConfig = inject(Router).config;
  topLevelRoutes: Route[] = [];

  constructor() {
    for (const route of this._routerConfig) {
      const showInMenu = route.data ? route.data['showInMenu'] : false;
      if (showInMenu) {
        const link = showInMenu === true ? route.path : showInMenu;
        this.topLevelRoutes.push({ ...route, path: link });
      }
    }
  }
}
