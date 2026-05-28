import { Component, inject } from '@angular/core';
import { BasicPageComponent } from '../../shared/components/basic-page/basic-page.component';
import { ConfigService } from '../../core/config.service';
import { EmailLinkPipe } from '../../shared/pipes/email-link.pipe';
import { PhoneLinkPipe } from '../../shared/pipes/phone-link.pipe';

@Component({
  selector: 'app-imprint',
  imports: [EmailLinkPipe, PhoneLinkPipe, BasicPageComponent],
  templateUrl: './imprint.component.html',
})
export class ImprintComponent {
  config = inject(ConfigService).getConfig();
}
