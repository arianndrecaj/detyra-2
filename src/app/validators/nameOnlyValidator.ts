import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameOnlyValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value || '';

    const valid = /^[a-zA-ZäöüÄÖÜß\s]+$/.test(value);

    return valid ? null : { nameOnly: true };
  };
}
