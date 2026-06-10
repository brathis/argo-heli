import { inject, Injectable } from '@angular/core';
import {
  VoucherOrderRequest,
  VoucherOrderResponse,
} from './voucher-order.interface';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoucherOrderService {
  private readonly _httpClient = inject(HttpClient);

  submit(request: VoucherOrderRequest): Observable<VoucherOrderResponse> {
    return this._httpClient
      .post<VoucherOrderResponse>(environment.voucherOrderEndpoint, request)
      .pipe(catchError(() => of({ success: false } as VoucherOrderResponse)));
  }
}
