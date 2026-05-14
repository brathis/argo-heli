import { Component, input } from '@angular/core';

@Component({
    selector: 'app-offering',
    imports: [],
    templateUrl: './offering.component.html'
})
export class OfferingComponent {
  imgSrc = input.required<string>();
  title = input.required<string>();
  text = input<string>();
}
