import { AfterViewInit, Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormRowComponent } from '../form-row/form-row.component';

@Component({
  selector: 'app-contact-data',
  standalone: true,
  imports: [
    FormBlockComponent,
    FormRowComponent,
    FormInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-data.component.html',
})
export class ContactDataComponent implements AfterViewInit {
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  streetFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl('', []);

  group = input.required<FormGroup>();

  ngAfterViewInit(): void {
    const group = this.group();
    group.addControl('firstName', this.firstNameFormControl);
    group.addControl('lastName', this.lastNameFormControl);
    group.addControl('street', this.streetFormControl);
    group.addControl('city', this.cityFormControl);
    group.addControl('email', this.emailFormControl);
    group.addControl('phone', this.phoneFormControl);
  }
}
