import { Component, effect, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '../../../../core/i18n/lang.service';

@Component({
  selector: 'app-flight-disclaimer',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './flight-disclaimer.component.html',
})
export class FlightDisclaimerComponent {
  readonly currentLang = inject(LangService).currentLang;
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
