import { Component, computed, input, signal } from '@angular/core';
import { HighlightConfig, HighlightsConfig } from '../../flight.interface';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-highlights-small',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './highlights-small.component.html',
})
export class HighlightsSmallComponent {
  highlights = input.required<HighlightsConfig>();
  currentHighlightIdx = signal<number>(0);
  currentHighlight = computed<HighlightConfig>(() => {
    const idx =
      this.currentHighlightIdx() >= this.highlights().highlights.length
        ? 0
        : this.currentHighlightIdx();
    return this.highlights().highlights[idx];
  });

  onScroll(event: any) {
    const relativeScrollPosition =
      event.target.scrollLeft / event.target.scrollWidth;
    const idx = Math.floor(
      0.5 + relativeScrollPosition * this.highlights().highlights.length,
    );
    this.currentHighlightIdx.set(idx);
  }

  onClickPrevious(): void {
    this._scrollToHighlight(this.currentHighlightIdx() - 1);
  }

  onClickNext(): void {
    this._scrollToHighlight(this.currentHighlightIdx() + 1);
  }

  private _scrollToHighlight(highlightIdx: number): void {
    if (
      highlightIdx < 0 ||
      highlightIdx >= this.highlights().highlights.length
    ) {
      return;
    }
    const newHighlightEl = document.querySelector(
      `[data-highlight-id="${highlightIdx}"]`,
    );
    if (!newHighlightEl) {
      return;
    }
    (newHighlightEl as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}
