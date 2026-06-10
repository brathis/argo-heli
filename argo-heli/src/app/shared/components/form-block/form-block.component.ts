import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-block',
  templateUrl: './form-block.component.html',
})
export class FormBlockComponent {
  title = input<string>();
  infoText = input<string>();
}
