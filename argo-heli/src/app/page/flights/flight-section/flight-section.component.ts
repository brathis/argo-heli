import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { HeroLayerDirective } from '../common/hero/hero-layer.directive';
import { HeroComponent } from '../common/hero/hero.component';
import { HighlightsComponent } from '../common/highlights/highlights.component';
import { PriceTagComponent } from '../common/price-tag/price-tag.component';
import { Flight } from '../flight.interface';

@Component({
  selector: 'app-flight-section',
  standalone: true,
  imports: [
    HeroComponent,
    HeroLayerDirective,
    NgOptimizedImage,
    PriceTagComponent,
    HighlightsComponent,
    ButtonComponent,
  ],
  templateUrl: './flight-section.component.html',
})
export class FlightSectionComponent {
  flight = input.required<Flight>();
}
