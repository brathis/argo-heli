import { FormControl } from '@angular/forms';

export interface ContactData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  email: string;
  phone: string;
}

export interface ContactDataFormGroup {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
