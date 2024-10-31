import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BackendRequest,
  BackendResponse,
  BackendService,
} from './backend-service.interface';

@Injectable()
export class NetlifyFormsBackendService implements BackendService {
  private _isLoading = signal(false);
  private _httpClient = inject(HttpClient);

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  submit(request: BackendRequest): Observable<BackendResponse> {
    const netlifyPayload = new HttpParams({
      fromObject: {
        ...this.flattenRequestFields(request),
        'form-name': 'Booking Request',
      },
    });
    return this._httpClient.post<BackendResponse>('/', netlifyPayload, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  private flattenRequestFields(request: BackendRequest): {
    [key: string]: string | number | null;
  } {
    const out: { [key: string]: string | number | null } = {};
    for (const [key, value] of Object.entries(request)) {
      if (typeof value === 'object') {
        const prefix = `${key}--`;
        for (const [itemKey, itemValue] of Object.entries(value)) {
          out[`${prefix}${itemKey}`] = itemValue as string | number | null;
        }
      } else {
        out[key] = value;
      }
    }
    return out;
  }
}
