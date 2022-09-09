import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material";
import {ContextService} from "../../services/context-service";
import {User} from "../../api/models/user";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedRoute: string;

  navigationItems: any[];

  constructor(public dialog: MatDialog, private contextService: ContextService, private router: Router) {
  }

  ngOnInit() {
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
    this.contextService.logout();
  }

  getUserName() {
    const user = this.contextService.getCurrentUser();
    return user.firstName + ' ' + user.lastName;
  }

  getRole() {
    return this.contextService.getCurrentUser().role;
  }

  getSelectedRoute() {
    this.selectedRoute = this.router.url;
  }

}
