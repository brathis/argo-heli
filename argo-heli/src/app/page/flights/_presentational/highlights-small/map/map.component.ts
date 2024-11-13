import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { HighlightConfig } from '../../../flight.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
})
export class MapComponent {
  mapSvg = input.required<string>();
  currentHighlight = input.required<HighlightConfig>();
  mapContainer =
    viewChild.required<ElementRef<HTMLSpanElement>>('mapContainer');

  constructor() {
    effect(() => {
      // load the SVG when a new flight is selected
      this.mapContainer().nativeElement.innerHTML = this.mapSvg();

      // hide the legends
      // TODO: maybe there is a cleaner way to discern the two legends? Dedicated mobile map would probably be best.
      const legends = document.querySelectorAll('#Legends')[1];
      if (legends) {
        (legends as HTMLElement).style.display = 'none';
      }
    });

    effect(() => {
      // This must be done unconditionally so that Angular can track the signal reads
      // at the first execution of the effect.
      const currentHighlight = this.currentHighlight();

      // set the offset distance when a new highlight is selected
      // TODO: maybe there is a cleaner way to discern the two helis?
      const heli = document.querySelectorAll('#heli')[1];
      if (heli) {
        (heli as HTMLElement).style.offsetDistance =
          `${100 * currentHighlight.pathPosition}%`;
      }
    });
  }
}
