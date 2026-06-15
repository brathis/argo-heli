import { ContactData } from '../../shared/models/contact-data.interface';

export interface VoucherOrderRequest {
  flight: {
    id: string;
    title: string;
  };
  billingAddress: ContactData;
  delivery: VoucherDelivery;
  termsAndConditions: TermsAndConditions;
}

export type VoucherDeliveryMethod = 'LETTER' | 'DOWNLOAD';

export interface VoucherDelivery {
  deliveryMethod: VoucherDeliveryMethod;
  deliveryEmail?: string;
  deliveryAddressEqualsBillingAddress?: boolean;
  deliveryAddress?: ContactData;
}

export interface TermsAndConditions {
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
}

export interface VoucherOrderResponse {
  success: boolean;
  checkoutUrl?: string;
}
