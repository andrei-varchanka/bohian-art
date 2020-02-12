import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-painting-adding',
  templateUrl: './painting-adding.component.html',
  styleUrls: ['./painting-adding.component.scss']
})
export class PaintingAddingComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  genres = ['Still life', 'Landscape', 'Portrait', 'Animalism', 'Nude'];

  images: File[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
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

  deleteImages() {
    this.images = null;
  }

  submit() {

  }
}
