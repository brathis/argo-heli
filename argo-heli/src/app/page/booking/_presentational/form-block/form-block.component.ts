import { Component, input } from '@angular/core';

@Component({
    selector: 'app-form-block',
    imports: [],
    templateUrl: './form-block.component.html'
})
export class FormBlockComponent {
  title = input.required();
  infoText = input.required();
}
