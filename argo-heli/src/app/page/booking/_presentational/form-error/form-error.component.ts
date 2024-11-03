import { Component, input } from '@angular/core';
import { PhoneLinkPipe } from '../../../../common/phone-link.pipe';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [PhoneLinkPipe],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  contactEmail = input.required<string>();
  contactPhone = input.required<string>();
  errorEmailLink = input.required<string>();
}
