import { Component, inject } from '@angular/core';
import { ConfigService } from '../config.service';
import { PhoneLinkPipe } from '../phone-link.pipe';
import { EmailLinkPipe } from '../email-link.pipe';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [PhoneLinkPipe, EmailLinkPipe, RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  config = inject(ConfigService).getConfig();
  currentYear = new Date().getFullYear();
}
