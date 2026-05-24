import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EmailLinkPipe } from '../../../../common/email-link.pipe';
import {
  getCheapestFlightCost,
  getLongestFlightDuration,
  getShortestFlightDuration,
} from '../../../flights/flights/_all';
import { OfferingComponent } from './offering/offering.component';
import { LangService } from '../../../../common/i18n/lang.service';

@Component({
  selector: 'app-offerings',
  imports: [OfferingComponent, EmailLinkPipe, RouterLink, TranslateModule],
  templateUrl: './offerings.component.html',
})
export class OfferingsComponent {
  currentLang = inject(LangService).currentLang;
  cheapestFlightCost = getCheapestFlightCost();
  shortestFlightDuration = getShortestFlightDuration();
  longestFlightDuration = getLongestFlightDuration();
  contactEmail = input.required<string>();
}
