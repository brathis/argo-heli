import { Component, inject } from '@angular/core';
import { BasicPageComponent } from '../../shared/components/basic-page/basic-page.component';
import { ConfigService } from '../../core/config.service';
import { SectionComponent } from './components/section/section.component';
import { SubsectionComponent } from './components/subsection/subsection.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [BasicPageComponent, SectionComponent, SubsectionComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  config = inject(ConfigService).getConfig();
}
