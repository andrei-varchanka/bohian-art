import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaintingsService} from "../../api/services/paintings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-painting-adding',
  templateUrl: './painting-adding.component.html',
  styleUrls: ['./painting-adding.component.scss']
})
export class PaintingAddingComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  images: File[];

  constructor(private formBuilder: FormBuilder, private paintingService: PaintingsService, private router: Router) {
  }

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

  isFormValid(): boolean {
    let isFormValid = true;
    if (this.form.invalid) {
      for (let inner in this.form.controls) {
        this.form.get(inner).markAsTouched();
      }
      isFormValid = false;
    }
    return isFormValid;
  }

  submit() {
    if (!this.isFormValid()) {
      return;
    }
    const paintingDto = {
      image: this.images[0],
      name: this.form.controls.name.value,
      author: this.form.controls.author.value,
      genres: this.form.controls.genres.value,
      width: +this.form.controls.width.value,
      height: +this.form.controls.height.value,
      price: +this.form.controls.price.value,
      description: this.form.controls.description.value
    };
    this.paintingService.uploadPainting(paintingDto).subscribe(response => {
      this.router.navigate(['/']);
    });
  }
}
