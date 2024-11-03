import { Component, effect, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormRowComponent } from '../form-row/form-row.component';
import { FormSelectComponent } from '../form-select/form-select.component';

@Component({
  selector: 'app-flight-data',
  standalone: true,
  imports: [
    FormBlockComponent,
    FormRowComponent,
    FormInputComponent,
    ReactiveFormsModule,
    FormSelectComponent,
  ],
  templateUrl: './flight-data.component.html',
})
export class FlightDataComponent {
  baseFormControl = new FormControl('', [Validators.required]);
  passengersFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(3),
  ]);
  departureDateFormControl = new FormControl('', [Validators.required]);
  departureTimeFormControl = new FormControl('', [Validators.required]);

  group = input.required<FormGroup>();

  flightDataFormGroup = new FormGroup({
    base: this.baseFormControl,
    passengers: this.passengersFormControl,
    departureDate: this.departureDateFormControl,
    departureTime: this.departureTimeFormControl,
  });

  constructor() {
    effect(() => {
      const group = this.group();
      if (!group) {
        return;
      }
      group.addControl('base', this.baseFormControl);
      group.addControl('passengers', this.passengersFormControl);
      group.addControl('departureDate', this.departureDateFormControl);
      group.addControl('departureTime', this.departureTimeFormControl);
    });
  }
}
