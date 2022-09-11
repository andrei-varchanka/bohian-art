import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {User} from "../../api/models/user";
import {UsersService} from "../../api/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<User>();

  displayedColumns = ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(data => {
      this.dataSource.data = data.users as User[];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEditClick(user: User) {
    this.router.navigate(['/user/' + user.id]);
  }

  onDeleteClick(user: User) {
    const dialogRef = this.dialog.open(UserDeletionConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(user.id).subscribe(response => {
          this.dataSource.data = this.dataSource.data.filter(u => user.id !== u.id);
        });
      }
    });
  }

  doSearch(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

@Component({
  selector: 'app-user-deletion-confirmation',
  templateUrl: './user-deletion-confirmation.html',
})
export class UserDeletionConfirmationComponent {}
