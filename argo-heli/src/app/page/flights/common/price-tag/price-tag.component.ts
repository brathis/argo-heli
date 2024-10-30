import { Component, input } from '@angular/core';

@Component({
  selector: 'app-price-tag',
  standalone: true,
  imports: [],
  templateUrl: './price-tag.component.html',
})
export class PriceTagComponent {
  price = input.required();
}
