import { Component, input } from '@angular/core';
import { StarComponent } from '../star/star.component';

@Component({
    selector: 'app-review',
    imports: [StarComponent],
    templateUrl: './review.component.html'
})
export class ReviewComponent {
  imgSrc = input.required<string>();
  title = input.required<string>();
  name = input<string>();
}
