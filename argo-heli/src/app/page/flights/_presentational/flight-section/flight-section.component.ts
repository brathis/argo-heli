import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Flight } from '../../flight.interface';
import { HeroStaticComponent } from '../hero-static/hero-static.component';
import { PriceTagComponent } from '../price-tag/price-tag.component';

@Component({
  selector: 'app-flight-section',
  imports: [
    PriceTagComponent,
    ButtonComponent,
    HeroStaticComponent,
    TranslateModule,
  ],
  templateUrl: './flight-section.component.html',
})
export class FlightSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);

  flight = input.required<Flight>();

  heroImgSrc = computed(() => `/flights/${this.flight().id}/hero.webp`);
  mapSvg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.flight().mapSvg),
  );
}
