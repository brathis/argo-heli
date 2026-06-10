import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactData } from '../../shared/models/contact-data.interface';

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
  flight: {
    title: string;
  };
  flightData: FlightData;
  contactData: ContactData;
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
