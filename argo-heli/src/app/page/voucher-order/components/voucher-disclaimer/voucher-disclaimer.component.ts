import { Component, inject, input } from '@angular/core';
import { LangService } from '../../../../core/i18n/lang.service';
import { TranslatePipe } from '@ngx-translate/core';
import { FormCheckboxComponent } from '../../../../shared/components/form-checkbox/form-checkbox.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-voucher-disclaimer',
  templateUrl: './voucher-disclaimer.component.html',
  imports: [TranslatePipe, FormCheckboxComponent, RouterLink],
})
export class VoucherDisclaimerComponent {
  readonly currentLang = inject(LangService).currentLang;

  group = input.required<FormGroup>();

  get acceptedTerms() {
    return this.group().get('acceptedTerms') as FormControl;
  }

  get acceptedPrivacyPolicy() {
    return this.group().get('acceptedPrivacyPolicy') as FormControl;
  }
}
