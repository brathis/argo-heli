import { Component, input } from '@angular/core';

@Component({
  selector: 'app-price-tag',
  standalone: true,
  imports: [],
  templateUrl: './price-tag.component.html',
  styleUrl: './price-tag.component.scss',
})
export class PriceTagComponent {
  price = input.required();
}
