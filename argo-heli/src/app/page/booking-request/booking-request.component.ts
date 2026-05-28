import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { ButtonLargeDirective } from '../../shared/components/button/button-large.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ConfigService } from '../../core/config.service';
import { Flight } from '../flights/flight.interface';
import { allFlights, allFlightsMap } from '@content/flights';
import { ContactDataComponent } from './components/contact-data/contact-data.component';
import { FlightDataComponent } from './components/flight-data/flight-data.component';
import { FlightDisclaimerComponent } from './components/flight-disclaimer/flight-disclaimer.component';
import { FlightSelectorItemComponent } from './components/flight-selector/flight-selector-item/flight-selector-item.component';
import { FlightSelectorComponent } from './components/flight-selector/flight-selector.component';
import { FlightSummaryComponent } from './components/flight-summary/flight-summary.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { DefaultBookingRequestService } from './booking-request.service';
import {
  BOOKING_REQUEST,
  BookingRequestService,
  ContactData,
  FlightData,
  TermsAndConditions,
} from './booking-request.interface';

@Component({
  selector: 'app-booking-request',
  imports: [
    ContactDataComponent,
    FlightDataComponent,
    FlightSelectorComponent,
    FlightSelectorItemComponent,
    ReactiveFormsModule,
    FlightSummaryComponent,
    AsyncPipe,
    FlightDisclaimerComponent,
    ButtonComponent,
    ButtonLargeDirective,
    FormErrorComponent,
    TranslateModule,
  ],
  templateUrl: './booking-request.component.html',
  providers: [
    { provide: BOOKING_REQUEST, useClass: DefaultBookingRequestService },
  ],
})
export class BookingRequestComponent {
  private _route = inject(ActivatedRoute);
  private _translate = inject(TranslateService);

  loading = signal(false);
  errorEmailLink = signal<string | null>(null);

  contactDataFormGroup = new FormGroup({});
  flightDataFormGroup = new FormGroup({});
  flightFormControl = new FormControl<Flight | null>(
    this.getFlightFromQueryParam(),
    [Validators.required],
  );
  termsAndConditionsFormGroup = new FormGroup({});
  bookingFormGroup = new FormGroup({
    contactData: this.contactDataFormGroup,
    flightData: this.flightDataFormGroup,
    flight: this.flightFormControl,
    termsAndConditions: this.termsAndConditionsFormGroup,
  });
  flights = allFlights;
  totalFlightCost: Observable<number | null> =
    this.bookingFormGroup.valueChanges.pipe(
      map((form) => {
        const passengers = (form?.flightData as { passengers?: number })
          ?.passengers;
        const flightCostPerPassenger = (form?.flight as Flight)?.cost;
        if (passengers && flightCostPerPassenger) {
          return passengers * flightCostPerPassenger;
        }
        return null;
      }),
    );
  config = inject(ConfigService).getConfig();

  private readonly _backendService: BookingRequestService =
    inject(BOOKING_REQUEST);
  private readonly router = inject(Router);

  submit(): void {
    if (!this.bookingFormGroup.valid || this.loading()) {
      return;
    }

    const contactData = this.bookingFormGroup.value.contactData as ContactData;
    const flightData = this.bookingFormGroup.value.flightData as FlightData;
    const flight = this.bookingFormGroup.value.flight as Flight;
    const termsAndConditions = this.bookingFormGroup.value
      .termsAndConditions as TermsAndConditions;

    this.loading.set(true);
    this.errorEmailLink.set(null);
    this._backendService
      .submit({
        contactData,
        flightData,
        flight: {
          title: flight.title,
        },
        termsAndConditions,
      })
      .subscribe((response) => {
        this.loading.set(false);
        if (response.success) {
          this.router.navigate([
            '/',
            this._translate.getCurrentLang(),
            'booking',
            'success',
          ]);
        } else {
          this.errorEmailLink.set(this.createEmailLink());
        }
      });
  }

  private createEmailLink(): string {
    const flightData = this.bookingFormGroup.value.flightData as FlightData;
    const contactData = this.bookingFormGroup.value.contactData as ContactData;
    const params = {
      date: new Date(flightData.departureDate).toLocaleDateString('de-CH'),
      time: new Date(flightData.departureTime).toLocaleTimeString('de-CH'),
      base: flightData.base,
      passengers: flightData.passengers.toString(),
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      street: contactData.street,
      city: contactData.city,
      email: contactData.email,
      phone: contactData.phone,
    };
    const subject = this._translate.instant('booking.email.subject', params);
    const body = this._translate.instant('booking.email.body', params);

    return `mailto:${encodeURIComponent(
      `${this.config.contactEmail}?subject=${subject}&body=${body}`,
    )}`;
  }

  private getFlightFromQueryParam(): Flight | null {
    const flightId = this._route.snapshot.queryParamMap.get('flight');
    if (!flightId) {
      return null;
    }
    return allFlightsMap[flightId];
  }
}
