import { Component, input } from '@angular/core';

@Component({
  selector: 'app-flight-summary',
  standalone: true,
  imports: [],
  templateUrl: './flight-summary.component.html',
})
export class FlightSummaryComponent {
  total = input.required<number | null>();
}
