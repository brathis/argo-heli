import { Injectable, signal, Signal } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { BackendResponse, BackendService } from './backend-service.interface';

@Injectable()
export class DummyBackendService implements BackendService {
  private _isLoading = signal(false);

  get isLoading(): Signal<boolean> {
    return this._isLoading;
  }

  submit(): Observable<BackendResponse> {
    this._isLoading.set(true);
    return timer(1500).pipe(
      map(() => {
        return { success: true };
      }),
      tap(() => {
        this._isLoading.set(false);
      }),
    );
  }
}
