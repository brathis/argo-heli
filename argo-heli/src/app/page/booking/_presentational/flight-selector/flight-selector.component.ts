import {
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { scrollIntoViewHorizontally } from '../../../../common/scroll.util';
import { Flight } from '../../../flights/flight.interface';
import { FlightSelectorItemComponent } from './flight-selector-item/flight-selector-item.component';

@Component({
  selector: 'app-flight-selector',
  imports: [TranslateModule],
  templateUrl: './flight-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlightSelectorComponent),
      multi: true,
    },
  ],
})
export class FlightSelectorComponent implements ControlValueAccessor {
  scrollContainer = viewChild.required<ElementRef>('scrollContainer');
  items = contentChildren(FlightSelectorItemComponent);
  selectedFlight = signal<Flight | null>(null);

  private _onChange: ((flight: Flight | null) => void) | null = null;
  private _onTouched: (() => void) | null = null;
  private _touched = false;

  constructor() {
    effect(() => {
      this._isChanged(this.selectedFlight());
    });
    effect(() => {
      for (const item of this.items()) {
        item.clicked.subscribe(() => {
          this._isTouched();
          this.selectedFlight.set(item.flight() ?? null);
        });
        item.selected = computed(() => {
          return item.flight()?.id === this.selectedFlight()?.id;
        });
        if (item.flight()?.id === this.selectedFlight()?.id) {
          this._scrollIntoView(item.flight()?.id);
        }
      }
    });
  }

  writeValue(obj: Flight | null): void {
    this.selectedFlight.set(obj);
    this._scrollIntoView((obj as Flight)?.id);
  }

  registerOnChange(fn: (flight: Flight | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
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

  private _isChanged(value: Flight | null): void {
    if (this._onChange !== null) {
      this._onChange(value);
    }
  }

  private _scrollIntoView(flightId: string | undefined): void {
    if (!flightId) {
      return;
    }
    const flightEl = document.querySelector(
      `[data-flight-id="${flightId}"]`,
    ) as HTMLElement;
    const scrollContainer = this.scrollContainer().nativeElement as HTMLElement;
    if (flightEl && scrollContainer) {
      scrollIntoViewHorizontally(scrollContainer, flightEl);
    }
  }
}
