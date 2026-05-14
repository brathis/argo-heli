import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  output,
  Signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../../flights/flight.interface';

@Component({
    selector: 'app-flight-selector-item',
    imports: [NgClass, RouterLink],
    templateUrl: './flight-selector-item.component.html',
    styleUrl: './flight-selector-item.component.scss'
})
export class FlightSelectorItemComponent implements AfterViewInit {
  flight = input<Flight>();

  // this is set by the parent FlightSelectorComponent
  selected: Signal<boolean> | null = null;

  clicked = output<void>();

  boxRef = viewChild.required<ElementRef>('box');

  ngAfterViewInit(): void {
    this.boxRef().nativeElement.style.setProperty(
      '--background-url',
      `url("flights/${this.flight()?.id}/thumbnail.webp")`,
    );
  }
}
