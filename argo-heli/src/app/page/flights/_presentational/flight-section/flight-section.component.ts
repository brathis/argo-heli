import { Component, computed, input } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Flight } from '../../flight.interface';
import { HeroStaticComponent } from '../hero-static/hero-static.component';
import { PriceTagComponent } from '../price-tag/price-tag.component';

@Component({
  selector: 'app-flight-section',
  standalone: true,
  imports: [PriceTagComponent, ButtonComponent, HeroStaticComponent],
  templateUrl: './flight-section.component.html',
})
export class FlightSectionComponent {
  flight = input.required<Flight>();

  heroImgSrc = computed(() => `/flights/${this.flight().id}/hero.webp`);
  routeImgSrc = computed(() => `/flights/${this.flight().id}/route.svg`);
}
