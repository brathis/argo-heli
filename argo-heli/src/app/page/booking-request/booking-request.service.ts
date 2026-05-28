import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BookingRequestRequest,
  BookingRequestResponse,
  BookingRequestService,
} from './booking-request.interface';

@Injectable()
export class DefaultBookingRequestService implements BookingRequestService {
  private readonly _httpClient = inject(HttpClient);

  isLoading = signal(false);

  submit(request: BookingRequestRequest): Observable<BookingRequestResponse> {
    this.isLoading.set(true);
    return this._httpClient
      .post<BookingRequestResponse>(environment.bookingRequestEndpoint, request)
      .pipe(
        tap(() => {
          this.isLoading.set(false);
        }),
        catchError(() => of({ success: false } as BookingRequestResponse)),
      );
  }
}
