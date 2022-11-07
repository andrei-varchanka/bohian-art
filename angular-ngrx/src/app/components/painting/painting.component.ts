import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Painting } from "../../api/models/painting";
import { User } from "../../api/models/user";
import { mergeMap, takeUntil } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { deletePaintingAction, getPaintingAction, PaintingActions } from 'src/app/store/actions/painting.actions';
import { Actions, ofType } from '@ngrx/effects';
import { getUserAction } from 'src/app/store/actions/user.actions';
import { selectSelectedUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingComponent implements OnInit, OnDestroy {

  painting: Painting;

  user$: Observable<User>;

  currentUser$: Observable<User>;

  componentDestroyed = new Subject();

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router,
    private store: Store<AppState>, private actions$: Actions, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.user$ = this.store.select(selectSelectedUser);
    const paintingId = this.route.snapshot.params.id;
    this.store.dispatch(getPaintingAction({ paintingId }));
    this.actions$.pipe(
      ofType(PaintingActions.GetPaintingSuccess),
      takeUntil(this.componentDestroyed),
    ).subscribe(response => {
      this.painting = response;
      this.cdr.markForCheck();
      this.store.dispatch(getUserAction({ userId: this.painting.userId }))
    });
    this.actions$.pipe(
      ofType(PaintingActions.DeletePaintingSuccess),
      takeUntil(this.componentDestroyed),
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getImageSrc() {
    if (this.painting) {
      return this.painting.image.data;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(PaintingDeletionConfirmationComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.componentDestroyed)).subscribe(result => {
      if (result) {
        this.store.dispatch(deletePaintingAction({ paintingId: this.painting.id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

}

@Component({
  selector: 'app-painting-deletion-confirmation',
  templateUrl: './painting-deletion-confirmation.html',
})
export class PaintingDeletionConfirmationComponent { }
