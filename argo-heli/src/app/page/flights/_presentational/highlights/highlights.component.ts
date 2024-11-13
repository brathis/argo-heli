import { Component, computed, input, signal } from '@angular/core';
import { HighlightConfig, HighlightsConfig } from '../../flight.interface';
import { HighlightInfoComponent } from './highlight-info/highlight-info.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [MapComponent, HighlightInfoComponent],
  templateUrl: './highlights.component.html',
})
export class HighlightsComponent {
  highlights = input.required<HighlightsConfig>();
  currentHighlightIdx = signal<number>(0);
  currentHighlight = computed<HighlightConfig>(() => {
    const idx =
      this.currentHighlightIdx() >= this.highlights().highlights.length
        ? 0
        : this.currentHighlightIdx();
    return this.highlights().highlights[idx];
  });
}
