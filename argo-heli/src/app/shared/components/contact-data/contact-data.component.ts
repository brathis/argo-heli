import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormRowComponent } from '../form-row/form-row.component';

@Component({
  selector: 'app-contact-data',
  imports: [
    FormRowComponent,
    FormInputComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './contact-data.component.html',
})
export class ContactDataComponent {
  group = input.required<FormGroup>();

  get firstName() {
    return this.group().get('firstName') as FormControl;
  }
  get lastName() {
    return this.group().get('lastName') as FormControl;
  }
  get street() {
    return this.group().get('street') as FormControl;
  }
  get city() {
    return this.group().get('city') as FormControl;
  }
  get email() {
    return this.group().get('email') as FormControl;
  }
  get phone() {
    return this.group().get('phone') as FormControl;
  }
}
