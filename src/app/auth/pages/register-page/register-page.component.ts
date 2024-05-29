import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )  ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorsService.canBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },{
    validators: [ this.validatorsService.isFieldOneEqualsFieldTwo('password', 'password2') ]
  });

  public savedData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Excelente trabajo!',
      text: 'Has completado el formulario!',
      showConfirmButton: false,
      timer: 1500
    })

    this.savedData.push(this.myForm.value);
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
