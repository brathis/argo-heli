import { Component, effect, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-flight-disclaimer',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './flight-disclaimer.component.html'
})
export class FlightDisclaimerComponent {
  acceptedTermsOfBookingRequestFormControl = new FormControl(false, [
    Validators.requiredTrue,
  ]);
  acceptedPrivacyPolicyFormControl = new FormControl(false, [
    Validators.requiredTrue,
  ]);

  group = input.required<FormGroup>();

  constructor() {
    effect(() => {
      const group = this.group();
      if (!group) {
        return;
      }
      group.addControl(
        'acceptedTermsOfBookingRequest',
        this.acceptedTermsOfBookingRequestFormControl,
      );
      group.addControl(
        'acceptedPrivacyPolicy',
        this.acceptedPrivacyPolicyFormControl,
      );
    });
  }
}
