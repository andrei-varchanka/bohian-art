import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-painting-adding',
  templateUrl: './painting-adding.component.html',
  styleUrls: ['./painting-adding.component.scss']
})
export class PaintingAddingComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  images: File[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      author: [null, [Validators.required]],
      genres: [null, [Validators.required]],
      height: [null, [Validators.required]],
      width: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null]
    });
  }

  getErrorMessage(controlName: string, fieldName?: string): string {
    let errorText = '';
    if (!fieldName) {
      fieldName = controlName;
    }
    const control = this.form.controls[controlName];
    if (control && control.errors) {
      if (control.hasError('required')) {
        errorText = `Please fill in '${fieldName}' field`;
      }
    }

    return errorText;
  }

  setImages(event) {
    this.images = event;
  }

  setGenres(genres) {
    this.form.controls.genres.setValue(genres);
  }

  checkInteger(event) {
    return event.charCode !== 46;
  }

  checkNumberFormat(event, formControlName: string) {
    const correctedValue = event.target.value.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2');
    event.target.value = correctedValue;
    this.form.controls[formControlName].setValue(correctedValue, {emitEvent: false});
  }

  deleteImages() {
    this.images = null;
  }

  submit() {
    console.log(this.form.value);
  }
}
