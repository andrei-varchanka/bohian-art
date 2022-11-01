import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import { MatDialog } from "@angular/material/dialog";
import {User} from "../../api/models/user";
import {NavigationEnd, Router} from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';
import { setAuthTokenAction, setCurrentUserAction } from 'src/app/store/actions/system.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedRoute: string;

  navigationItems: any[];

  currentUser: User;

  constructor(public dialog: MatDialog, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.navigationItems = [
      {
        route: 'gallery',
        label: 'Gallery'
      },
      {
        route: 'contacts',
        label: 'Contacts'
      }
    ];
    this.getSelectedRoute();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getSelectedRoute();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  logout(): void {
    this.store.dispatch(setCurrentUserAction(null));
    this.store.dispatch(setAuthTokenAction({token: null}));
    this.router.navigate(['/']);
  }

  getUserName() {
    return this.currentUser ? (this.currentUser.firstName + ' ' + this.currentUser.lastName) : '';
  }

  getRole() {
    return this.currentUser?.role;
  }

  getSelectedRoute() {
    this.selectedRoute = this.router.url;
  }

}
