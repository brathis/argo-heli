import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SecondaryNavComponent } from '../../common/secondary-nav/secondary-nav.component';
import { Flight } from './flight.interface';
import { HeroComponent } from './common/hero/hero.component';
import { PriceTagComponent } from './common/price-tag/price-tag.component';
import { ButtonComponent } from '../../common/button/button.component';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HighlightsComponent } from './common/highlights/highlights.component';
import { toedi } from './flights/toedi';
import { saentis } from './flights/saentis';
import { churfirsten } from './flights/churfirsten';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    SecondaryNavComponent,
    RouterOutlet,
    HeroComponent,
    PriceTagComponent,
    ButtonComponent,
    CommonModule,
    HighlightsComponent,
  ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  static readonly FLIGHTS: { [key: string]: Flight } = {
    saentis,
    churfirsten,
    toedi,
  };

  flight: Flight | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    // TODO: This should not have to be this complicated... Something's up
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((_) => {
        const flightId = this.route.firstChild?.snapshot.data['flightId'];
        this.flight = FlightsComponent.FLIGHTS[flightId];
      });
  }
}
