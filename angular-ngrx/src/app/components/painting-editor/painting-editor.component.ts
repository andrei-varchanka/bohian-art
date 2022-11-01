import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { PaintingsService } from "../../api/services/paintings.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/api/models';
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-painting-editor',
  templateUrl: './painting-editor.component.html',
  styleUrls: ['./painting-editor.component.scss']
})
export class PaintingEditorComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  images: File[] = [];

  imagesSrc: string[] = [];

  loading: boolean;

  paintingId: string;

  currentUser: User;

  constructor(private formBuilder: UntypedFormBuilder, private paintingService: PaintingsService, private router: Router,
    private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.paintingId = this.route.snapshot.params.id;
    if (this.paintingId) {
      this.loading = true;
      this.paintingService.getPainting(this.paintingId).subscribe(response => {
        const painting = response.painting;
        this.form = this.formBuilder.group({
          name: [painting.name, [Validators.required]],
          author: [painting.author, [Validators.required]],
          genres: [painting.genres, [Validators.required]],
          height: [painting.height, [Validators.required]],
          width: [painting.width, [Validators.required]],
          price: [painting.price, [Validators.required]],
          description: [painting.description]
        });
        this.imagesSrc = [painting.image.data];
        this.loading = false;
      });
    } else {
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        author: [null, [Validators.required]],
        genres: [[], [Validators.required]],
        height: [null, [Validators.required]],
        width: [null, [Validators.required]],
        price: [null, [Validators.required]],
        description: [null]
      });
    }
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
      if (control.hasError('required') && controlName === 'genres') {
        errorText = 'Please select at least one genre';
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
    this.form.controls[formControlName].setValue(correctedValue, { emitEvent: false });
  }

  deleteImages() {
    this.images = [];
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
      name: this.form.controls.name.value,
      author: this.form.controls.author.value,
      userId: this.currentUser.id,
      genres: this.form.controls.genres.value.join('+'),
      width: +this.form.controls.width.value,
      height: +this.form.controls.height.value,
      price: +this.form.controls.price.value,
      description: this.form.controls.description.value
    } as any;
    if (this.images[0]) {
      paintingDto.image = this.images[0];
    }
    if (this.paintingId) {
      paintingDto.paintingId = this.paintingId;
      this.paintingService.updatePainting(paintingDto).subscribe(response => {
        this.router.navigate(['/gallery/' + this.paintingId]);
      });
    } else {
      this.paintingService.uploadPainting(paintingDto).subscribe(response => {
        this.router.navigate(['/gallery/' + response.painting.id]);
      });
    }

  }
}
