import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  email: string;
  phone: string;
}

export interface FlightData {
  base: string;
  departureDate: string;
  departureTime: string;
  passengers: number;
}

export interface TermsAndConditions {
  acceptedTermsOfBookingRequest: boolean;
  acceptedPrivacyPolicy: boolean;
}

export interface BackendRequest {
  contactData: ContactData;
  flightData: FlightData;
  flight: {
    title: string;
  };
  termsAndConditions: TermsAndConditions;
}

export interface BackendResponse {
  success: boolean;
}

export interface BackendService {
  isLoading: Signal<boolean>;
  submit(request: BackendRequest): Observable<BackendResponse>;
}

export const BACKEND_SERVICE = new InjectionToken<BackendService>(
  'A service for submitting booking requests to a backend service',
);
