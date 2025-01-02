import { Component } from '@angular/core';
import { uetliberg } from '../../../flights/flights/uetliberg';
import { OfferingComponent } from './offering/offering.component';

@Component({
  selector: 'app-offerings',
  standalone: true,
  imports: [OfferingComponent],
  templateUrl: './offerings.component.html',
})
export class OfferingsComponent {
  cheapestFlightCost = uetliberg.cost;
}
