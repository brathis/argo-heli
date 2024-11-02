import { Component, inject } from '@angular/core';
import { ConfigService } from '../../common/config.service';
import { EmailLinkPipe } from '../../common/email-link.pipe';
import { PhoneLinkPipe } from '../../common/phone-link.pipe';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [EmailLinkPipe, PhoneLinkPipe],
  templateUrl: './imprint.component.html',
})
export class ImprintComponent {
  config = inject(ConfigService).getConfig();
}
