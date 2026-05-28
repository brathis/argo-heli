import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../core/config.service';
import { EmailLinkPipe } from '../../shared/pipes/email-link.pipe';
import { PhoneLinkPipe } from '../../shared/pipes/phone-link.pipe';
import { BasicPageComponent } from '../../shared/components/basic-page/basic-page.component';

@Component({
  selector: 'app-success',
  imports: [EmailLinkPipe, PhoneLinkPipe, BasicPageComponent, TranslateModule],
  templateUrl: './booking-request-success.component.html',
})
export class BookingRequestSuccessComponent {
  config = inject(ConfigService).getConfig();
}
