import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-voucher-summary',
  imports: [TranslatePipe],
  templateUrl: './voucher-summary.component.html',
})
export class VoucherSummaryComponent {
  total = input.required<number | null>();
}
