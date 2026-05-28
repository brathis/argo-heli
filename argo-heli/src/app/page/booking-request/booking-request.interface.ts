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

export interface BookingRequestRequest {
  contactData: ContactData;
  flightData: FlightData;
  flight: {
    title: string;
  };
  termsAndConditions: TermsAndConditions;
}

export interface BookingRequestResponse {
  success: boolean;
}

export interface BookingRequestService {
  isLoading: Signal<boolean>;
  submit(request: BookingRequestRequest): Observable<BookingRequestResponse>;
}

export const BOOKING_REQUEST = new InjectionToken<BookingRequestService>(
  'A service for submitting booking requests to a backend service',
);
