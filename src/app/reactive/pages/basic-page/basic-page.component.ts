import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 1600,
  inStorage: 10
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
})

export class BasicPageComponent implements OnInit {


  public myForm: FormGroup = this.myFormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(
    private myFormBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    //this.myForm.reset( rtx5090 );
  }


  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(arg0: string) {
    return this.validatorsService.getFieldError(this.myForm, arg0);
  }


  onSave():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({
      price: 10,
      inStorage: 0
    });
  }


}
