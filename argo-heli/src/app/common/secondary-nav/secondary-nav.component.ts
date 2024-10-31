import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SecondaryRoute {
  title: string;
  path: string;
}

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './secondary-nav.component.html',
})
export class SecondaryNavComponent {
  routes = input<SecondaryRoute[]>();
}
