import { Component, effect, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormRowComponent } from '../form-row/form-row.component';
import { FormSelectComponent } from '../form-select/form-select.component';

@Component({
    selector: 'app-flight-data',
    imports: [
        FormBlockComponent,
        FormRowComponent,
        FormInputComponent,
        ReactiveFormsModule,
        FormSelectComponent,
    ],
    templateUrl: './flight-data.component.html'
})
export class FlightDataComponent {
  baseFormControl = new FormControl('LSZU', [Validators.required]);
  passengersFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(3),
    Validators.pattern(/\d+/),
  ]);
  departureDateFormControl = new FormControl('', [
    Validators.required,
    this.isFutureDateValidator,
  ]);
  departureTimeFormControl = new FormControl('', [Validators.required]);

  group = input.required<FormGroup>();

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

  private isFutureDateValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = new Date(control.value);
    const date = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
    );
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (date.valueOf() <= today.valueOf()) {
      return { isNotFutureDate: { value: control.value } };
    }
    return null;
  }
}
