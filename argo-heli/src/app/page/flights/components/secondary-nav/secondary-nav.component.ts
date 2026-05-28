import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface SecondaryRoute {
  title: string;
  path: string;
}

@Component({
  selector: 'app-secondary-nav',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './secondary-nav.component.html',
})
export class SecondaryNavComponent {
  routes = input<SecondaryRoute[]>();
}
