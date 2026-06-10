import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormBlockComponent } from '../../../../shared/components/form-block/form-block.component';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input.component';
import { FormRowComponent } from '../../../../shared/components/form-row/form-row.component';
import { FormSelectComponent } from '../../../../shared/components/form-select/form-select.component';

@Component({
  selector: 'app-booking-request-flight-data',
  imports: [
    FormBlockComponent,
    FormRowComponent,
    FormInputComponent,
    ReactiveFormsModule,
    FormSelectComponent,
    TranslateModule,
  ],
  templateUrl: './booking-request-flight-data.component.html',
})
export class BookingRequestFlightDataComponent {
  group = input.required<FormGroup>();

  get base() {
    return this.group().get('base') as FormControl;
  }
  get passengers() {
    return this.group().get('passengers') as FormControl;
  }
  get departureDate() {
    return this.group().get('departureDate') as FormControl;
  }
  get departureTime() {
    return this.group().get('departureTime') as FormControl;
  }
}
