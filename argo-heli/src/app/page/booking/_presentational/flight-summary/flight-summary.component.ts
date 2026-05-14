import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-flight-summary',
  imports: [TranslateModule],
  templateUrl: './flight-summary.component.html',
})
export class FlightSummaryComponent {
  total = input.required<number | null>();
}
