import { Component, inject } from '@angular/core';
import { ConfigService } from '../../../common/config.service';
import { EmailLinkPipe } from '../../../common/email-link.pipe';
import { PhoneLinkPipe } from '../../../common/phone-link.pipe';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [EmailLinkPipe, PhoneLinkPipe],
  templateUrl: './success.component.html',
})
export class SuccessComponent {
  config = inject(ConfigService).getConfig();
}
