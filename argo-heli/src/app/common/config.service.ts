import { Injectable } from '@angular/core';

export interface Config {
  contactEmail: string;
  contactPhone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  getConfig(): Config {
    return {
      contactEmail: 'mathis@argo-heli.ch',
      contactPhone: '+41 76 707 85 27',
    };
  }
}
