import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-block',
  standalone: true,
  imports: [],
  templateUrl: './form-block.component.html',
  styleUrl: './form-block.component.scss',
})
export class FormBlockComponent {
  title = input.required();
  infoText = input.required();
}
