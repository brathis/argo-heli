import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  imports: [TranslatePipe],
})
export class FormPageComponent {
  heading = input<string>();
}
