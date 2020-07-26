import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material";
import {ContextService} from "../../services/context-service";
import {User} from "../../api/models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private contextService: ContextService) {
  }

  ngOnInit() {
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

}
