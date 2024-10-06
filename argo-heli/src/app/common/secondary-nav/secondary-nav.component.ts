import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  Routes,
} from '@angular/router';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.scss',
})
export class SecondaryNavComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}
  getRoutes(): Routes {
    return this.activatedRoute.snapshot.routeConfig?.children ?? [];
  }
}
