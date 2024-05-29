import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.myFormBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor(
    private myFormBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }
  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.myForm, field);
  }


  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const {termsAndConditions, ...data} = this.myForm.value;
    Swal.fire({
      icon: 'success',
      title: 'Excelente trabajo!',
      text: 'Has completado el formulario!',
      showConfirmButton: false,
      timer: 1500
    })
    this.person = this.myForm.value;
  }
}
