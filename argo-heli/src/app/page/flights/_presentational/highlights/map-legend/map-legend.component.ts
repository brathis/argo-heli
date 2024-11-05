import { NgClass } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-map-legend',
  standalone: true,
  imports: [NgClass],
  templateUrl: './map-legend.component.html',
})
export class MapLegendComponent {
  el = viewChild.required<ElementRef<HTMLSpanElement>>('legend');

  click = output<void>();

  label = input<string>();
  top = input<number>();
  left = input<number>();
  active = input<boolean>();

  constructor() {
    effect(() => {
      this.el().nativeElement.style.top = `${this.top()}%`;
      this.el().nativeElement.style.left = `${this.left()}%`;
    });
  }
}
