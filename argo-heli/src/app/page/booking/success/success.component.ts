import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '@common/services/config.service';
import { EmailLinkPipe } from '@common/email-link.pipe';
import { PhoneLinkPipe } from '@common/phone-link.pipe';
import { BasicPageComponent } from '@common/basic-page/basic-page.component';

@Component({
  selector: 'app-success',
  imports: [EmailLinkPipe, PhoneLinkPipe, BasicPageComponent, TranslateModule],
  templateUrl: './success.component.html',
})
export class SuccessComponent {
  config = inject(ConfigService).getConfig();
}
