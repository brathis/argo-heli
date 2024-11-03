import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { saentis } from '../../../flights/flights/saentis';
import { OfferingComponent } from './offering/offering.component';

@Component({
  selector: 'app-offerings',
  standalone: true,
  imports: [OfferingComponent, RouterLink],
  templateUrl: './offerings.component.html',
})
export class OfferingsComponent {
  saentisCost = saentis.cost;
}
