import { Component, inject } from '@angular/core';
import { ConfigService } from '../config.service';
import { PhoneLinkPipe } from '../phone-link.pipe';
import { EmailLinkPipe } from '../email-link.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PhoneLinkPipe, EmailLinkPipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  config = inject(ConfigService).getConfig();
  currentYear = new Date().getFullYear();
}
