import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { ButtonLargeDirective } from '../../shared/components/button/button-large.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ConfigService } from '../../core/config.service';
import { Flight } from '../flights/flight.interface';
import { allFlights } from '@content/flights';
import { BookingRequestFlightDataComponent } from './components/booking-request-flight-data/booking-request-flight-data.component';
import { BookingRequestDisclaimerComponent } from './components/booking-request-disclaimer/booking-request-disclaimer.component';
import { FlightSelectorItemComponent } from '../../shared/components/flight-selector/flight-selector-item/flight-selector-item.component';
import { FlightSelectorComponent } from '../../shared/components/flight-selector/flight-selector.component';
import { BookingRequestSummaryComponent } from './components/booking-request-summary/booking-request-summary.component';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { DefaultBookingRequestService } from './booking-request.service';
import {
  BOOKING_REQUEST,
  BookingRequestService,
  FlightData,
  TermsAndConditions,
} from './booking-request.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormPageComponent } from '../../shared/components/form-page/form-page.component';
import { ContactData } from '../../shared/models/contact-data.interface';
import { createContactDataFormGroup } from '../../shared/utils/contact-data.util';
import { BookingRequestContactDataComponent } from './components/booking-request-contact-data/booking-request-contact-data.component';
import { FlightsService } from '../flights/flights.service';
import { PhoneLinkPipe } from '../../shared/pipes/phone-link.pipe';

@Component({
  selector: 'app-booking-request',
  imports: [
    BookingRequestFlightDataComponent,
    FlightSelectorComponent,
    FlightSelectorItemComponent,
    ReactiveFormsModule,
    BookingRequestSummaryComponent,
    AsyncPipe,
    BookingRequestDisclaimerComponent,
    ButtonComponent,
    ButtonLargeDirective,
    FormErrorComponent,
    FormPageComponent,
    BookingRequestContactDataComponent,
    PhoneLinkPipe,
    TranslatePipe,
  ],
  templateUrl: './booking-request.component.html',
  providers: [
    { provide: BOOKING_REQUEST, useClass: DefaultBookingRequestService },
  ],
})
export class BookingRequestComponent {
  private readonly _flightsService = inject(FlightsService);
  private readonly _translate = inject(TranslateService);
  private readonly _backendService: BookingRequestService =
    inject(BOOKING_REQUEST);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  readonly config = inject(ConfigService).getConfig();

  loading = signal(false);
  errorEmailLink = signal<string | null>(null);

  flightFormControl = new FormControl<Flight | null>(
    this._flightsService.getFlightFromQueryParam(),
    [Validators.required],
  );
  flightDataFormGroup = new FormGroup({
    base: new FormControl('LSZU', [Validators.required]),
    passengers: new FormControl('', [
      Validators.required,
      Validators.min(1),
      (control) => this.maxPassengersValidator(control),
      Validators.pattern(/\d+/),
    ]),
    departureDate: new FormControl('', [
      Validators.required,
      BookingRequestComponent.isFutureDateValidator,
    ]),
    departureTime: new FormControl('', [Validators.required]),
  });
  contactDataFormGroup = createContactDataFormGroup();
  termsAndConditionsFormGroup = new FormGroup({
    acceptedTermsOfBookingRequest: new FormControl(false, [
      Validators.requiredTrue,
    ]),
    acceptedPrivacyPolicy: new FormControl(false, [Validators.requiredTrue]),
  });
  bookingFormGroup = new FormGroup({
    flight: this.flightFormControl,
    flightData: this.flightDataFormGroup,
    contactData: this.contactDataFormGroup,
    termsAndConditions: this.termsAndConditionsFormGroup,
  });
  flights = allFlights;
  totalFlightCost: Observable<number | null> =
    this.flightFormControl.valueChanges.pipe(
      map((flight) => {
        return flight?.totalCost ?? null;
      }),
    );

  constructor() {
    this.flightFormControl.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() =>
        this.flightDataFormGroup
          .get('passengers')
          ?.updateValueAndValidity({ onlySelf: true }),
      );
  }

  submit(): void {
    if (!this.bookingFormGroup.valid || this.loading()) {
      return;
    }

    const flight = this.bookingFormGroup.value.flight as Flight;
    const flightData = this.bookingFormGroup.value
      .flightData as unknown as FlightData;
    const contactData = this.bookingFormGroup.value
      .contactData as unknown as ContactData;
    const termsAndConditions = this.bookingFormGroup.value
      .termsAndConditions as unknown as TermsAndConditions;

    this.loading.set(true);
    this.errorEmailLink.set(null);
    this._backendService
      .submit({
        flight: {
          title: flight.title,
        },
        flightData,
        contactData,
        termsAndConditions,
      })
      .subscribe((response) => {
        this.loading.set(false);
        if (response.success) {
          this._router.navigate([
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
    const flightData = this.bookingFormGroup.value
      .flightData as unknown as FlightData;
    const contactData = this.bookingFormGroup.value
      .contactData as unknown as ContactData;
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
    const subject = this._translate.instant(
      'booking-request.email.subject',
      params,
    );
    const body = this._translate.instant('booking-request.email.body', params);

    return `mailto:${encodeURIComponent(
      `${this.config.contactEmail}?subject=${subject}&body=${body}`,
    )}`;
  }

  private maxPassengersValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const maxPassengers = this.flightFormControl?.value?.maxPassengers ?? null;
    if (maxPassengers === null) {
      return null;
    }
    return control.value > maxPassengers
      ? { tooManyPassengers: { value: control.value } }
      : null;
  }

  private static isFutureDateValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = new Date(control.value);
    const date = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
    );
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (date.valueOf() <= today.valueOf()) {
      return { isNotFutureDate: { value: control.value } };
    }
    return null;
  }
}
