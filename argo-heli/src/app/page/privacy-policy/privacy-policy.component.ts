import { Component, inject } from '@angular/core';
import { BasicPageComponent } from '@common/basic-page/basic-page.component';
import { ConfigService } from '@common/services/config.service';
import { SectionComponent } from './_presentational/section/section.component';
import { SubsectionComponent } from './_presentational/subsection/subsection.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [BasicPageComponent, SectionComponent, SubsectionComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  config = inject(ConfigService).getConfig();
}
