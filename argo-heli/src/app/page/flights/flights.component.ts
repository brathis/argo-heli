import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { ButtonComponent } from '../../common/button/button.component';
import { SecondaryNavComponent } from '../../common/secondary-nav/secondary-nav.component';
import { HeroLayerDirective } from './common/hero/hero-layer.directive';
import { HeroComponent } from './common/hero/hero.component';
import { HighlightsComponent } from './common/highlights/highlights.component';
import { PriceTagComponent } from './common/price-tag/price-tag.component';
import { Flight } from './flight.interface';
import { churfirsten } from './flights/churfirsten';
import { saentis } from './flights/saentis';
import { toedi } from './flights/toedi';

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
    HeroLayerDirective,
    NgOptimizedImage,
  ],
  templateUrl: './flights.component.html',
})
export class FlightsComponent {
  static readonly FLIGHTS: { [key: string]: Flight } = {
    saentis,
    churfirsten,
    toedi,
  };

  flightA: Flight | null = null;
  flightB: Flight | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    // TODO: there has to be a better way than to subscribe to all router events?
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((_) => {
        // TODO: this switching business is beyond stupid. Surely there is a better way?
        const flightId = this.route.firstChild?.snapshot.data['flightId'];
        if (!this.flightA && !this.flightB) {
          this.flightA = FlightsComponent.FLIGHTS[flightId];
        } else if (!this.flightA) {
          this.flightA = FlightsComponent.FLIGHTS[flightId];
          this.flightB = null;
        } else {
          this.flightB = FlightsComponent.FLIGHTS[flightId];
          this.flightA = null;
        }
      });
  }
}
