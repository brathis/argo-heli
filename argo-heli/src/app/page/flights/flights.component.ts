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
  ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  static readonly FLIGHTS: { [key: string]: Flight } = {
    saentis: {
      title: 'Säntis',
      path: '/flights/saentis',
      cost: 140,
      duration: 25,
      hero: {
        foregroundImgSrc: '/flights/saentis/foreground.webp',
        backgroundImgSrc: '/flights/saentis/background.webp',
      },
      synopsis:
        'In ca. 80 Minuten geht es zunächst via Einsiedeln zu den Mythen, dann via ' +
        'Andermatt zum Oberalppass. Dort überfliegen wir den Claridenfirn mit einer ' +
        'atemberaubender Aussicht auf den Tödi.',
    },
    churfirsten: {
      title: 'Churfirsten',
      path: '/flights/churfirsten',
      cost: 180,
      duration: 45,
      hero: {
        foregroundImgSrc: '/flights/churfirsten/foreground.webp',
        backgroundImgSrc: '/flights/churfirsten/background.webp',
      },
      synopsis:
        'In ca. 80 Minuten geht es zunächst via Einsiedeln zu den Mythen, dann via ' +
        'Andermatt zum Oberalppass. Dort überfliegen wir den Claridenfirn mit einer ' +
        'atemberaubender Aussicht auf den Tödi.',
    },
    toedi: {
      title: 'Tödi',
      path: '/flights/toedi',
      cost: 400,
      duration: 80,
      hero: {
        foregroundImgSrc: '/flights/toedi/foreground.webp',
        backgroundImgSrc: '/flights/toedi/background.webp',
      },
      synopsis:
        'In ca. 80 Minuten geht es zunächst via Einsiedeln zu den Mythen, dann via ' +
        'Andermatt zum Oberalppass. Dort überfliegen wir den Claridenfirn mit einer ' +
        'atemberaubender Aussicht auf den Tödi.',
    },
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
