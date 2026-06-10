import { Component, inject, signal } from '@angular/core';
import { FormPageComponent } from '../../shared/components/form-page/form-page.component';
import { FlightSelectorComponent } from '../../shared/components/flight-selector/flight-selector.component';
import { FlightSelectorItemComponent } from '../../shared/components/flight-selector/flight-selector-item/flight-selector-item.component';
import { allFlights } from '@content/flights';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { createContactDataFormGroup } from '../../shared/utils/contact-data.util';
import { VoucherDeliveryComponent } from './components/voucher-delivery/voucher-delivery.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ButtonLargeDirective } from '../../shared/components/button/button-large.directive';
import { VoucherBillingAddressComponent } from './components/voucher-billing-address/voucher-billing-address.component';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { VoucherDeliveryMethod } from './voucher-order.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Flight } from '../flights/flight.interface';
import { FlightsService } from '../flights/flights.service';
import { TranslatePipe } from '@ngx-translate/core';
import { VoucherDisclaimerComponent } from './components/voucher-disclaimer/voucher-disclaimer.component';
import { VoucherSummaryComponent } from './components/voucher-summary/voucher-summary.component';
import { AsyncPipe } from '@angular/common';
import { VoucherOrderService } from './voucher-order.service';
import { FormErrorComponent } from '../../shared/components/form-error/form-error.component';
import { ConfigService } from '../../core/config.service';
import { PhoneLinkPipe } from '../../shared/pipes/phone-link.pipe';
import { EmailLinkPipe } from '../../shared/pipes/email-link.pipe';

@Component({
  selector: 'app-voucher-order',
  templateUrl: './voucher-order.component.html',
  imports: [
    FormPageComponent,
    FlightSelectorComponent,
    FlightSelectorItemComponent,
    VoucherDeliveryComponent,
    ButtonComponent,
    ButtonLargeDirective,
    VoucherBillingAddressComponent,
    ReactiveFormsModule,
    TranslatePipe,
    VoucherDisclaimerComponent,
    VoucherSummaryComponent,
    AsyncPipe,
    FormErrorComponent,
    PhoneLinkPipe,
    EmailLinkPipe,
  ],
})
export class VoucherOrderComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _flightsService = inject(FlightsService);
  private readonly _voucherOrderService = inject(VoucherOrderService);
  readonly config = inject(ConfigService).getConfig();
  protected readonly flights = allFlights;
  protected readonly formGroup = this._fb.group({
    flight: new FormControl<Flight | null>(
      this._flightsService.getFlightFromQueryParam(),
      [Validators.required],
    ),
    billingAddress: createContactDataFormGroup(),
    delivery: this._fb.group({
      deliveryMethod: new FormControl<VoucherDeliveryMethod | null>(null, [
        Validators.required,
      ]),
      deliveryEmail: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      deliveryAddressEqualsBillingAddress: new FormControl(true),
      deliveryAddress: createContactDataFormGroup(),
    }),
    terms: this._fb.group({
      acceptedTerms: new FormControl(false, Validators.requiredTrue),
      acceptedPrivacyPolicy: new FormControl(false, Validators.requiredTrue),
    }),
  });
  protected readonly totalFlightCost: Observable<number | null> =
    this.flightFormControl.valueChanges.pipe(
      map((flight) => {
        return flight?.totalCost ?? null;
      }),
    );
  protected readonly loading = signal(false);
  protected readonly error = signal(false);

  constructor() {
    const deliveryMethodControl = this.deliveryFormGroup.get(
      'deliveryMethod',
    ) as FormControl<VoucherDeliveryMethod | null>;
    const deliveryEmailControl = this.deliveryFormGroup.get(
      'deliveryEmail',
    ) as FormControl;
    const deliveryAddressEqualsBillingAddressControl =
      this.deliveryFormGroup.get(
        'deliveryAddressEqualsBillingAddress',
      ) as FormControl;
    const deliveryAddressGroup = this.deliveryFormGroup.get(
      'deliveryAddress',
    ) as FormGroup;
    deliveryEmailControl.disable();
    deliveryAddressEqualsBillingAddressControl.disable();
    deliveryAddressGroup.disable();
    combineLatest([
      deliveryMethodControl.valueChanges.pipe(
        startWith(deliveryMethodControl.value),
        distinctUntilChanged(),
      ),
      deliveryAddressEqualsBillingAddressControl.valueChanges.pipe(
        startWith(deliveryAddressEqualsBillingAddressControl.value),
        distinctUntilChanged(),
      ),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([deliveryMethod, deliveryAddressEqualsBillingAddress]) => {
        this.setEnabled(deliveryEmailControl, deliveryMethod === 'DOWNLOAD');
        this.setEnabled(
          deliveryAddressEqualsBillingAddressControl,
          deliveryMethod === 'LETTER',
        );
        this.setEnabled(
          deliveryAddressGroup,
          deliveryMethod === 'LETTER' && !deliveryAddressEqualsBillingAddress,
        );
      });
  }

  submit() {
    if (this.formGroup.invalid || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.error.set(false);
    const formValue = this.formGroup.value;
    // TODO: This mapping logic is horrible. There has to be a better way!
    this._voucherOrderService
      .submit({
        flight: {
          id: formValue.flight?.id ?? '',
          title: formValue.flight?.title ?? '',
        },
        billingAddress: {
          firstName: formValue.billingAddress?.firstName ?? '',
          lastName: formValue.billingAddress?.lastName ?? '',
          street: formValue.billingAddress?.street ?? '',
          city: formValue.billingAddress?.city ?? '',
          email: formValue.billingAddress?.email ?? '',
          phone: formValue.billingAddress?.phone ?? '',
        },
        delivery: {
          deliveryMethod: formValue.delivery?.deliveryMethod ?? 'LETTER',
          deliveryEmail: formValue.delivery?.deliveryEmail ?? undefined,
          deliveryAddressEqualsBillingAddress:
            formValue.delivery?.deliveryAddressEqualsBillingAddress ??
            undefined,
          deliveryAddress: formValue.delivery?.deliveryAddress
            ? {
                firstName: formValue.delivery?.deliveryAddress?.firstName ?? '',
                lastName: formValue.delivery?.deliveryAddress?.lastName ?? '',
                street: formValue.delivery?.deliveryAddress?.street ?? '',
                city: formValue.delivery?.deliveryAddress?.city ?? '',
                email: formValue.delivery?.deliveryAddress?.email ?? '',
                phone: formValue.delivery?.deliveryAddress?.phone ?? '',
              }
            : undefined,
        },
        termsAndConditions: {
          acceptedTerms: formValue.terms?.acceptedTerms ?? false,
          acceptedPrivacyPolicy:
            formValue.terms?.acceptedPrivacyPolicy ?? false,
        },
      })
      .subscribe((response) => {
        this.loading.set(false);
        if (response.success) {
          // TODO: Redirect to checkout page
        } else {
          this.error.set(true);
        }
      });
  }

  get flightFormControl() {
    return this.formGroup.get('flight') as FormControl<Flight | null>;
  }

  get billingAddressFormGroup() {
    return this.formGroup.get('billingAddress') as FormGroup;
  }

  get deliveryFormGroup() {
    return this.formGroup.get('delivery') as FormGroup;
  }

  get termsFormGroup() {
    return this.formGroup.get('terms') as FormGroup;
  }

  private setEnabled(formControl: AbstractControl, enable: boolean) {
    if (enable) {
      formControl.enable();
    } else {
      formControl.disable();
    }
  }
}
