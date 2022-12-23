import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../../api/models/user";
import { Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { deleteUserAction, getUsersAction, getUsersErrorAction, UserActions } from 'src/app/store/actions/user.actions';
import { selectUsers } from 'src/app/store/selectors/user.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<User>();

  displayedColumns = ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  componentDestroyed = new Subject();

  constructor(private dialog: MatDialog, private router: Router, private store: Store<AppState>, private actions$: Actions) { }

  ngOnInit() {
    this.store.dispatch(getUsersAction());
    this.store.select(selectUsers).pipe(takeUntil(this.componentDestroyed)).subscribe((users) => {
      this.dataSource.data = users as User[];
    });
    this.subscribeOnDelete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEditClick(user: User) {
    this.router.navigate(['/users/' + user.id]);
  }

  onDeleteClick(user: User) {
    const dialogRef = this.dialog.open(UserDeletionConfirmationComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.componentDestroyed)).subscribe(result => {
      if (result) {
        this.store.dispatch(deleteUserAction({ userId: user.id }));
      }
    });
  }

  subscribeOnDelete() {
    this.actions$.pipe(
      ofType(UserActions.DELETE_USER_SUCCESS),
      takeUntil(this.componentDestroyed)
    ).subscribe(action => console.log((action as any).payload));
  }

  doSearch(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}

@Component({
  selector: 'app-user-deletion-confirmation',
  templateUrl: './user-deletion-confirmation.html',
})
export class UserDeletionConfirmationComponent { }