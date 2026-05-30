import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  group = input.required<FormGroup>();

  get acceptedTermsOfBookingRequest() {
    return this.group().get('acceptedTermsOfBookingRequest') as FormControl;
  }
  get acceptedPrivacyPolicy() {
    return this.group().get('acceptedPrivacyPolicy') as FormControl;
  }
}
