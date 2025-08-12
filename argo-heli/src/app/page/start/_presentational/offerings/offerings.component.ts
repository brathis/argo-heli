import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmailLinkPipe } from '../../../../common/email-link.pipe';
import {
  getCheapestFlightCost,
  getLongestFlightDuration,
  getShortestFlightDuration,
} from '../../../flights/flights/_all';
import { OfferingComponent } from './offering/offering.component';

@Component({
  selector: 'app-offerings',
  standalone: true,
  imports: [OfferingComponent, EmailLinkPipe, RouterLink],
  templateUrl: './offerings.component.html',
})
export class OfferingsComponent {
  cheapestFlightCost = getCheapestFlightCost();
  shortestFlightDuration = getShortestFlightDuration();
  longestFlightDuration = getLongestFlightDuration();
  contactEmail = input.required<string>();
}
