import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { HighlightConfig, HighlightsConfig } from '../../../flight.interface';
import { MapLegendComponent } from '../map-legend/map-legend.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapLegendComponent],
  templateUrl: './map.component.html',
})
export class MapComponent {
  highlights = input.required<HighlightsConfig>();
  // TODO: don't pass both the current highlight and its index
  currentHighlight = input.required<HighlightConfig>();
  currentHighlightIdx = input.required<number>();
  highlightClicked = output<number>();
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
