import { Component, input } from '@angular/core';
import { HighlightConfig } from '../../../flight.interface';

@Component({
  selector: 'app-highlight-info',
  standalone: true,
  imports: [],
  templateUrl: './highlight-info.component.html',
})
export class HighlightInfoComponent {
  currentHighlight = input.required<HighlightConfig>();
}
