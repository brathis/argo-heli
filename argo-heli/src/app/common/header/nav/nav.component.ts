import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  constructor(private readonly router: Router) {}

  getTopLevelRoutes(): Route[] {
    const routes = [];
    for (const route of this.router.config) {
      if (route.data && route.data['showInMenu']) {
        routes.push(route);
      }
    }
    return routes;
  }
}
