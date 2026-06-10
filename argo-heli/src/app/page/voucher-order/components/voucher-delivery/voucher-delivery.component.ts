import { Component, input } from '@angular/core';
import { FormBlockComponent } from '../../../../shared/components/form-block/form-block.component';
import { FormSelectComponent } from '../../../../shared/components/form-select/form-select.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FormRowComponent } from '../../../../shared/components/form-row/form-row.component';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input.component';
import { FormCheckboxComponent } from '../../../../shared/components/form-checkbox/form-checkbox.component';
import { ContactDataComponent } from '../../../../shared/components/contact-data/contact-data.component';

@Component({
  selector: 'app-voucher-delivery',
  templateUrl: './voucher-delivery.component.html',
  imports: [
    FormBlockComponent,
    FormSelectComponent,
    TranslatePipe,
    FormRowComponent,
    FormInputComponent,
    FormCheckboxComponent,
    ContactDataComponent,
  ],
})
export class VoucherDeliveryComponent {
  group = input.required<FormGroup>();

  get deliveryMethod() {
    return this.group().get('deliveryMethod') as FormControl;
  }

  get deliveryEmail() {
    return this.group().get('deliveryEmail') as FormControl;
  }

  get deliveryAddressEqualsBillingAddress() {
    return this.group().get(
      'deliveryAddressEqualsBillingAddress',
    ) as FormControl;
  }

  get deliveryAddress() {
    return this.group().get('deliveryAddress') as FormGroup;
  }
}
