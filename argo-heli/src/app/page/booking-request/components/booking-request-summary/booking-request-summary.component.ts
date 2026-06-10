import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-booking-request-summary',
  imports: [TranslatePipe],
  templateUrl: './booking-request-summary.component.html',
})
export class BookingRequestSummaryComponent {
  total = input.required<number | null>();
}
