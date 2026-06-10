import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { FormBlockComponent } from '../../../../shared/components/form-block/form-block.component';
import { ContactDataComponent } from '../../../../shared/components/contact-data/contact-data.component';

@Component({
  selector: 'app-booking-request-contact-data',
  templateUrl: './booking-request-contact-data.component.html',
  imports: [TranslatePipe, FormBlockComponent, ContactDataComponent],
})
export class BookingRequestContactDataComponent {
  group = input.required<FormGroup>();
}
