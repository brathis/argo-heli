import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Flight } from '../../flight.interface';
import { HeroLayerDirective } from '../hero/hero-layer.directive';
import { HeroComponent } from '../hero/hero.component';
import { HighlightsSmallComponent } from '../highlights-small/highlights-small.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { PriceTagComponent } from '../price-tag/price-tag.component';

@Component({
  selector: 'app-flight-section',
  standalone: true,
  imports: [
    HeroComponent,
    HeroLayerDirective,
    NgOptimizedImage,
    PriceTagComponent,
    HighlightsComponent,
    HighlightsSmallComponent,
    ButtonComponent,
  ],
  templateUrl: './flight-section.component.html',
})
export class FlightSectionComponent {
  flight = input.required<Flight>();
}
