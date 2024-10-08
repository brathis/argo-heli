import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  SimpleChanges,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-map-legend',
  standalone: true,
  imports: [],
  templateUrl: './map-legend.component.html',
  styleUrl: './map-legend.component.scss',
})
export class MapLegendComponent {
  el = viewChild.required<ElementRef<HTMLSpanElement>>('legend');

  @Output()
  click = new EventEmitter<void>();

  @Input()
  label: string = '';

  @Input()
  set top(top: number) {
    this.el().nativeElement.style.top = `${top}%`;
  }

  @Input()
  set left(left: number) {
    this.el().nativeElement.style.left = `${left}%`;
  }
}
