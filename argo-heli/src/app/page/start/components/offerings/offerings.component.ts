import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EmailLinkPipe } from '../../../../shared/pipes/email-link.pipe';
import { OfferingComponent } from '../offering/offering.component';
import { LangService } from '../../../../core/i18n/lang.service';
import { FlightsService } from '../../../flights/flights.service';

@Component({
  selector: 'app-offerings',
  imports: [OfferingComponent, EmailLinkPipe, RouterLink, TranslateModule],
  templateUrl: './offerings.component.html',
})
export class OfferingsComponent {
  currentLang = inject(LangService).currentLang;
  cheapestFlightCost = inject(FlightsService).getCheapestFlightCost();
  shortestFlightDuration = inject(FlightsService).getShortestFlightDuration();
  longestFlightDuration = inject(FlightsService).getLongestFlightDuration();
  contactEmail = input.required<string>();
}
