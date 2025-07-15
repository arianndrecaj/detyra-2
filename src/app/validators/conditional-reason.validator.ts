import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requireReasonIfJa(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const choice = group.get('choice')?.value;
    const reason = group.get('reason')?.value;

    if (choice === 'Ja' && (!reason || reason.trim() === '')) {
      group.get('reason')?.setErrors({ required: true });
      return { reasonRequired: true };
    }

    group.get('reason')?.setErrors(null);
    return null;
  };
}
