import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
  ],
  templateUrl: './flight-data.component.html',
})
export class FlightDataComponent {
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
