import { Component, input } from '@angular/core';

@Component({
    selector: 'app-section',
    imports: [],
    templateUrl: './section.component.html'
})
export class SectionComponent {
  title = input.required();
}
