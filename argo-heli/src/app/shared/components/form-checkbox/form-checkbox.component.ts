import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  imports: [ReactiveFormsModule],
})
export class FormCheckboxComponent {
  formControlId = input.required<string>();
  control = input.required<FormControl>();
}
