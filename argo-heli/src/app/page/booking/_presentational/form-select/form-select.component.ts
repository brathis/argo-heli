import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent {
  label = input.required();
  formControlId = input.required<string>();
  control = input.required<FormControl>();
}
