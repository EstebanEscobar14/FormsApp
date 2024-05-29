import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

interface Data {
  name: string;
  favouriteGames: string[];
}

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
      ['Uncharted', Validators.required],
      ['God of War', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);
  public savedData: Data[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  onAddFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    this.favouriteGames.push(
      this.formBuilder.control(this.newFavorite.value, Validators.required)
    );
    Swal.fire({
      icon: 'success',
      title: 'Se agrego correctamente',
    })
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Se elimino correctamente',
    })
    this.favouriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    Swal.fire({
      icon: 'success',
      title: 'Excelente trabajo!',
      text: 'Has completado el formulario!',
      showConfirmButton: false,
      timer: 1500
    });
    this.savedData.push(this.myForm.value);
    (this.myForm.controls['favouriteGames'] as FormArray).clear();
    //(this.myForm.controls['favouriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
}
