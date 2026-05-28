import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-price-tag',
  imports: [TranslateModule],
  templateUrl: './price-tag.component.html',
})
export class PriceTagComponent {
  price = input.required();
}
