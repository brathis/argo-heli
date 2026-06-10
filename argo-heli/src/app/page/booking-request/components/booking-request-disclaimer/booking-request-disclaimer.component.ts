import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from '../../../../core/i18n/lang.service';
import { FormCheckboxComponent } from '../../../../shared/components/form-checkbox/form-checkbox.component';

@Component({
  selector: 'app-booking-request-disclaimer',
  imports: [RouterLink, FormCheckboxComponent, TranslatePipe],
  templateUrl: './booking-request-disclaimer.component.html',
})
export class BookingRequestDisclaimerComponent {
  readonly currentLang = inject(LangService).currentLang;

  group = input.required<FormGroup>();

  get acceptedTermsOfBookingRequest() {
    return this.group().get('acceptedTermsOfBookingRequest') as FormControl;
  }

  get acceptedPrivacyPolicy() {
    return this.group().get('acceptedPrivacyPolicy') as FormControl;
  }
}
