import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ButtonLargeDirective } from '../../common/button/button-large.directive';
import { ButtonComponent } from '../../common/button/button.component';
import { ConfigService } from '../../common/config.service';
import { PhoneLinkPipe } from '../../common/phone-link.pipe';
import { Flight } from '../flights/flight.interface';
import { allFlights, allFlightsMap } from '../flights/flights/_all';
import { AwsBackendService } from './backend/aws-backend.service';
import {
  BACKEND_SERVICE,
  BackendService,
  ContactData,
  FlightData,
} from './backend/backend-service.interface';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { FlightDataComponent } from './flight-data/flight-data.component';
import { FlightDisclaimerComponent } from './flight-disclaimer/flight-disclaimer.component';
import { FlightSelectorItemComponent } from './flight-selector/flight-selector-item/flight-selector-item.component';
import { FlightSelectorComponent } from './flight-selector/flight-selector.component';
import { FlightSummaryComponent } from './flight-summary/flight-summary.component';

@Component({
  selector: 'app-booking',
  standalone: true,
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
    PhoneLinkPipe,
  ],
  templateUrl: './booking.component.html',
  providers: [{ provide: BACKEND_SERVICE, useClass: AwsBackendService }],
})
export class BookingComponent {
  private static readonly FALLBACK_EMAIL_SUBJECT_TEMPLATE = `Anfrage für Rundflug am <DATE>`;
  private static readonly FALLBACK_EMAIL_BODY_TEMPLATE = `
  Guten Tag

  Ich möchte gerne einen Rundflug buchen am <DATE> um <TIME> Uhr ab <BASE> für <PASSENGERS> Personen.

  Meine Kontaktdaten lauten wie folgt:
  <FIRST_NAME> <LAST_NAME>
  <STREET> <CITY>
  <EMAIL>
  <PHONE>
  `;
  private _route = inject(ActivatedRoute);

  loading = signal(false);
  errorEmailLink = signal<string | null>(null);

  contactDataFormGroup = new FormGroup({});
  flightDataFormGroup = new FormGroup({});
  flightFormControl = new FormControl<Flight | null>(
    this.getFlightFromQueryParam(),
    [Validators.required],
  );
  bookingFormGroup = new FormGroup({
    contactData: this.contactDataFormGroup,
    flightData: this.flightDataFormGroup,
    flight: this.flightFormControl,
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

  private readonly _backendService: BackendService = inject(BACKEND_SERVICE);
  private readonly router = inject(Router);

  submit(): void {
    if (!this.bookingFormGroup.valid || this.loading()) {
      return;
    }

    const contactData = this.bookingFormGroup.value.contactData as ContactData;
    const flightData = this.bookingFormGroup.value.flightData as FlightData;
    const flight = this.bookingFormGroup.value.flight as Flight;

    this.loading.set(true);
    this.errorEmailLink.set(null);
    this._backendService
      .submit({
        contactData,
        flightData,
        flight: {
          title: flight.title,
        },
      })
      .subscribe((response) => {
        this.loading.set(false);
        if (response.success) {
          this.router.navigateByUrl('/booking/success');
        } else {
          this.errorEmailLink.set(this.createEmailLink());
        }
      });
  }

  private createEmailLink(): string {
    const flightData = this.bookingFormGroup.value.flightData as FlightData;
    const contactData = this.bookingFormGroup.value.contactData as ContactData;
    const valueMap = {
      '<DATE>': new Date(flightData.departureDate).toLocaleDateString('de-CH'),
      '<TIME>': new Date(flightData.departureTime).toLocaleTimeString('de-CH'),
      '<BASE>': flightData.base,
      '<PASSENGERS>': flightData.passengers.toString(),
      '<FIRST_NAME>': contactData.firstName,
      '<LAST_NAME>': contactData.lastName,
      '<STREET>': contactData.street,
      '<CITY>': contactData.city,
      '<EMAIL>': contactData.email,
      '<PHONE>': contactData.phone,
    };
    let subject = BookingComponent.FALLBACK_EMAIL_SUBJECT_TEMPLATE;
    let body = BookingComponent.FALLBACK_EMAIL_BODY_TEMPLATE;

    for (const [pattern, value] of Object.entries(valueMap)) {
      subject = subject.replace(pattern, value);
      body = body.replace(pattern, value);
    }

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
