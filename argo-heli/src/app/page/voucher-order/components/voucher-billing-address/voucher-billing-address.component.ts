import { Component, input } from '@angular/core';
import { FormBlockComponent } from '../../../../shared/components/form-block/form-block.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ContactDataComponent } from '../../../../shared/components/contact-data/contact-data.component';

@Component({
  selector: 'app-voucher-billing-address',
  templateUrl: './voucher-billing-address.component.html',
  imports: [FormBlockComponent, TranslatePipe, ContactDataComponent],
})
export class VoucherBillingAddressComponent {
  group = input.required<FormGroup>();
}
