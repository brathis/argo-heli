import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-group',
    imports: [ReactiveFormsModule],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  label = input.required();
  formControlId = input.required<string>();
  control = input.required<FormControl>();
  type = input<string>('text');
  min = input<string>('');
  max = input<string>('');
}
