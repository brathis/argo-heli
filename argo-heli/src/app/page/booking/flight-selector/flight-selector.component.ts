import {
  AfterViewInit,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Flight } from '../../flights/flight.interface';
import { FlightSelectorItemComponent } from './flight-selector-item/flight-selector-item.component';

@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlightSelectorComponent),
      multi: true,
    },
  ],
})
export class FlightSelectorComponent
  implements AfterViewInit, ControlValueAccessor
{
  items = contentChildren(FlightSelectorItemComponent);
  selectedFlight = signal<Flight | null>(null);

  private _onChange: ((_: any) => void) | null = null;
  private _onTouched: (() => void) | null = null;
  private _touched = false;

  constructor() {
    effect(() => {
      // TODO: is there a better way?
      const flight = this.selectedFlight();
      this._isChanged(flight);
    });
  }

  writeValue(obj: any): void {
    this.selectedFlight.set(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  ngAfterViewInit(): void {
    for (const item of this.items()) {
      item.clicked.subscribe(() => {
        this._isTouched();
        this.selectedFlight.set(item.flight());
      });
      item.selected = computed(() => {
        return item.flight().title === this.selectedFlight()?.title;
      });
    }
  }

  private _isTouched(): void {
    if (this._touched) {
      return;
    }
    this._touched = true;
    if (this._onTouched !== null) {
      this._onTouched();
    }
  }

  private _isChanged(value: any): void {
    if (this._onChange !== null) {
      this._onChange(value);
    }
  }
}
