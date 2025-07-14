import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkboxValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const noDoctor = group.get('checkbox')?.value;
    if (noDoctor) {
      return null;
    }
    const requiredFields = ['vorname', 'nachname', 'strasse', 'nr', 'plz', 'ort'];
    for (const field of requiredFields) {
      if (!group.get(field)?.value) {
        return { requiredFieldsMissing: true };
      }
    }
    return null;
  };
}
