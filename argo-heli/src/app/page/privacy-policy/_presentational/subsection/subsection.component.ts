import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subsection',
  standalone: true,
  imports: [],
  templateUrl: './subsection.component.html',
})
export class SubsectionComponent {
  title = input.required();
}
