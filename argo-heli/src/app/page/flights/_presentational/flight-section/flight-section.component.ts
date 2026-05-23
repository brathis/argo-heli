import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Flight } from '../../flight.interface';
import { HeroStaticComponent } from '../hero-static/hero-static.component';
import { PriceTagComponent } from '../price-tag/price-tag.component';
import { RouterLink } from '@angular/router';
import { LangService } from '../../../../common/i18n/lang.service';

@Component({
  selector: 'app-flight-section',
  imports: [
    PriceTagComponent,
    ButtonComponent,
    HeroStaticComponent,
    TranslateModule,
    RouterLink,
  ],
  templateUrl: './flight-section.component.html',
})
export class FlightSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly currentLang = inject(LangService).currentLang;

  flight = input.required<Flight>();

  heroImgSrc = computed(() => `/flights/${this.flight().id}/hero.webp`);
  mapSvg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.flight().mapSvg),
  );
}
