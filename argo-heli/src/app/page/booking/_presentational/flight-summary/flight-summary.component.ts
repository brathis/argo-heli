import { Component, input } from '@angular/core';

@Component({
    selector: 'app-flight-summary',
    imports: [],
    templateUrl: './flight-summary.component.html'
})
export class FlightSummaryComponent {
  total = input.required<number | null>();
}
