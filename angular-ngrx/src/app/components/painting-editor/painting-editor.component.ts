import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { PaintingsService } from "../../api/services/paintings.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Painting, User } from 'src/app/api/models';
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { createPaintingAction, getPaintingAction, PaintingActions, updatePaintingAction } from 'src/app/store/actions/painting.actions';
import { Actions, ofType } from '@ngrx/effects';
import { selectIsLoading } from 'src/app/store/selectors/painting.selectors';

@Component({
  selector: 'app-painting-editor',
  templateUrl: './painting-editor.component.html',
  styleUrls: ['./painting-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingEditorComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup = new UntypedFormGroup({});

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  images: File[] = [];

  imagesSrc: string[] = [];

  loading$: Observable<boolean>;

  paintingId: string;

  currentUser: User;

  componentDestroyed = new Subject();

  constructor(private formBuilder: UntypedFormBuilder, private paintingService: PaintingsService, private router: Router,
    private route: ActivatedRoute, private store: Store<AppState>, private actions$: Actions) {
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).pipe(takeUntil(this.componentDestroyed)).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.loading$ = this.store.select(selectIsLoading);
    this.paintingId = this.route.snapshot.params.id;
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      author: [null, [Validators.required]],
      genres: [[], [Validators.required]],
      height: [null, [Validators.required]],
      width: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null]
    });
    if (this.paintingId) {
      this.getExistingPainting();
    }
    this.subscribeOnUpdating();
  }

  subscribeOnUpdating() {
    this.actions$.pipe(
      ofType(PaintingActions.CreatePaintingSuccess),
      takeUntil(this.componentDestroyed)
    ).subscribe((painting: Painting) => {
      this.router.navigate(['/gallery/' + painting.id]);
    });
    this.actions$.pipe(
      ofType(PaintingActions.UpdatePaintingSuccess),
      takeUntil(this.componentDestroyed)
    ).subscribe((painting: Painting) => {
      this.router.navigate(['/gallery/' + painting.id]);
    });
  }

  getExistingPainting() {
    this.store.dispatch(getPaintingAction({ paintingId: this.paintingId }));
    this.actions$.pipe(
      ofType(PaintingActions.GetPaintingSuccess),
      takeUntil(this.componentDestroyed),
    ).subscribe((response: Painting) => {
      const painting = response;
      this.form.patchValue({
        name: painting.name,
        author: painting.author,
        genres: painting.genres,
        height: painting.height,
        width: painting.width,
        price: painting.price,
        description: painting.description
      });
      this.imagesSrc = [painting.image.data];
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
      if (control.hasError('required') && controlName === 'genres') {
        errorText = 'Please select at least one genre';
      }
    }

    return errorText;
  }

  setImages(event) {
    this.images = event;
  }

  getSelectedGenres(): string[] {
    return JSON.parse(JSON.stringify(this.form.controls.genres.value));
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
      this.store.dispatch(updatePaintingAction(paintingDto));
    } else {
      this.store.dispatch(createPaintingAction(paintingDto));
    }

  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
