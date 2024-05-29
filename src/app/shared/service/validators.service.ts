import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public canBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true
      }
    }
    return null
  }

  public isValidField(form: FormGroup, field: string){
    return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualsFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;
      if (fieldOneValue !== fieldTwoValue) {
        formGroup.get(fieldTwo)?.setErrors({ noEquals: true })
        return { noEquals: true }
      }
      formGroup.get(fieldTwo)?.setErrors(null);
      return null
    }
  }

  getFieldError(from: FormGroup, field: string) {
    if (!from.controls[field]) {
      return null;
    }

    const errors = from.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }

    return null;
  }
}
