import {
  Component,
  computed,
  input,
  signal,
  effect,
  viewChild,
  ElementRef,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { HighlightConfig, HighlightsConfig } from '../../flight.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { MapLegendComponent } from './map-legend/map-legend.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.scss',
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
  legendContainerRef = viewChild.required<
    ElementRef<HTMLDivElement>,
    ViewContainerRef
  >('legendContainer', {
    read: ViewContainerRef,
  });

  constructor() {
    effect(() => {
      // load the SVG when a new flight is selected
      this.mapContainer().nativeElement.innerHTML = this.highlights().mapSvg;

      // draw the legends of the individual highlights
      for (const [
        highlightIdx,
        highlight,
      ] of this.highlights().highlights.entries()) {
        const legendComponent =
          this.legendContainerRef().createComponent(MapLegendComponent);
        legendComponent.setInput('label', highlight.title);
        legendComponent.instance.click.subscribe(() => {
          this.currentHighlightIdx.set(highlightIdx);
        });

        legendComponent.setInput('top', highlight.legendY);
        legendComponent.setInput('left', highlight.legendX);
      }
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

      // update the highlight image when a new highlight is selected
      const highlight = document.querySelector('#highlight');
      if (highlight) {
        (highlight as HTMLElement).style.setProperty(
          '--background-image-url',
          `url(${currentHighlight.imgSrc})`,
        );
      }
    });
  }
}
