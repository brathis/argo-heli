import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { HighlightConfig, HighlightsConfig } from '../../flight.interface';
import { MapLegendComponent } from './map-legend/map-legend.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [MapLegendComponent],
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
  mapContainer =
    viewChild.required<ElementRef<HTMLSpanElement>>('mapContainer');

  constructor() {
    effect(() => {
      // load the SVG when a new flight is selected
      this.mapContainer().nativeElement.innerHTML = this.highlights().mapSvg;
    });

    effect(() => {
      // This must be done unconditionally so that Angular can track the signal reads
      // at the first execution of the effect.
      const currentHighlight = this.currentHighlight();

      // set the offset distance when a new highlight is selected
      const heli = document.querySelector('#heli');
      if (heli) {
        (heli as HTMLElement).style.offsetDistance =
          `${100 * currentHighlight.pathPosition}%`;
      }
    });
  }
}
