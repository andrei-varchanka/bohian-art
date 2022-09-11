import {UntypedFormControl, ValidatorFn, ValidationErrors, UntypedFormGroup} from '@angular/forms';

// @dynamic
export class FormsValidators {
  static number(): ValidatorFn {
    return (control: UntypedFormControl): ValidationErrors | null => {
      const value = control.value;

      if (value) {
        const regex = new RegExp('(\\d*)(.*)');
        const match = regex.exec(value);

        // In second regular group will be all non-numeric symbols, so if there any - value is not valid number
        if (match[2]) {
          return { invalidNumber: true };
        }
      }

      return null;
    };
  }

  static decimal(fractionalLength: number) {
    return (control: UntypedFormControl) => {
      const value = control.value;

      if (value) {
        const regex = new RegExp(`([^\\d]*)(\\d*(\\.\\d{0,${fractionalLength}})?)(.*)`);
        const match = regex.exec(value);

        // In first regular group will be all non-numeric symbols, so if there any - value is not valid number
        if (match[1]) {
          return { invalidDecimal: true };
        }

        // In third regular group will be fractional part, so if there only dot - fractional part is not valid
        if (match[3] && match[3] === '.') {
          return { invalidDecimalFractional: true };
        }

        // In fourth regular group will be digits that exceed fractional threshold so if there any - fractional part is not valid
        if (match[4]) {
          return { invalidDecimalFractional: true };
        }
      }

      return null;
    };
  }

  static date(control: UntypedFormControl): ValidationErrors {
    const value = control.value;

    if (!value) {
      return { invalidDate: true };
    }
  }

  static dateOfBirth(control: UntypedFormControl): ValidationErrors {
    const value = control.value;

    if (value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const treshold = new Date('01/01/1900');

      if (value > today || value < treshold) {
        return { invalidDateOfBirth: true };
      }
    }

    return null;
  }

  static names(control: UntypedFormControl): ValidationErrors {
    const value = control.value;

    if (value) {
      const regex = new RegExp('^[^0-9_!¡?÷?¿\\\\+=@#$%ˆ^&*(){}|~<>,.;:[\\]]{1,100}$');
      const match = regex.exec(value);

      if (!match) {
        return { invalidNames: true };
      }
    }

    return null;
  }

  static email(control: UntypedFormControl): ValidationErrors {
    const value = control.value;

    if (value) {
      const regex = new RegExp('^([-!#-\'*+=?^-~A-Z.-9]{1,64}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z0-9-]{2,})$');
      const match = regex.exec(value);
      const emailParts = (value as string).split('@');
      if (!match || emailParts[0].length > 64 || (emailParts[1] && emailParts[1].length > 255)) {
        return { invalidEmail: true };
      }
    }

    return null;
  }

  static password(control: UntypedFormControl): ValidationErrors {
    const value = control.value;

    if (value) {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)');
      const match = regex.exec(value);

      if (!match) {
        return { invalidPassword: true };
      }
    }

    return null;
  }

  static confirmMatch(field: string) {
    return (control: UntypedFormControl) => {
      const value1 = control.value as string;

      if (!value1) {
        return null;
      }

      const confirmationField = (control.parent as UntypedFormGroup).get(field);

      if (!confirmationField) {
        return null;
      }

      if (value1 !== confirmationField.value) {
        return {invalidConfirmation: true};
      }
    };
  }
}
