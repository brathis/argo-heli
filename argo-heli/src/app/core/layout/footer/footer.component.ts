import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../config.service';
import { EmailLinkPipe } from '../../../shared/pipes/email-link.pipe';
import { LangService } from '../../i18n/lang.service';
import { PhoneLinkPipe } from '../../../shared/pipes/phone-link.pipe';

@Component({
  selector: 'app-footer',
  imports: [PhoneLinkPipe, EmailLinkPipe, RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  config = inject(ConfigService).getConfig();
  currentLang = inject(LangService).currentLang;
  currentYear = new Date().getFullYear();
}
