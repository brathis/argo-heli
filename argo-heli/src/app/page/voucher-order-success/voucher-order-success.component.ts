import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-voucher-order-success',
  templateUrl: './voucher-order-success.component.html',
})
export class VoucherOrderSuccessComponent {
  constructor() {
    const route = inject(ActivatedRoute);
    const router = inject(Router);
    const http = inject(HttpClient);

    const checkoutSessionId = route.snapshot.queryParamMap.get(
      'checkout_session_id',
    );
    if (checkoutSessionId) {
      router.navigate([], {
        relativeTo: route,
        queryParams: {},
        replaceUrl: true,
      });
      http
        .post(
          `${environment.checkoutSessionsEndpoint}/${checkoutSessionId}/fulfill`,
          {},
        )
        .subscribe({
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          error: () => {},
        });
    }
  }
}
