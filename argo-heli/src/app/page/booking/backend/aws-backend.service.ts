import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  BackendRequest,
  BackendResponse,
  BackendService,
} from './backend-service.interface';

@Injectable()
export class AwsBackendService implements BackendService {
  private readonly _httpClient = inject(HttpClient);

  isLoading = signal(false);

  submit(request: BackendRequest): Observable<BackendResponse> {
    this.isLoading.set(true);
    return this._httpClient
      .post<BackendResponse>(environment.bookingRequestEndpoint, request)
      .pipe(
        tap(() => {
          this.isLoading.set(false);
        }),
        catchError(() => of({ success: false } as BackendResponse)),
      );
  }
}
