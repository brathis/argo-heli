import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDataFormGroup } from '../models/contact-data.interface';

export function createContactDataFormGroup(): FormGroup<ContactDataFormGroup> {
  return new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
  });
}
