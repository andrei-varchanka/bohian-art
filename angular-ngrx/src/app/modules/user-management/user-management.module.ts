import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserDeletionConfirmationComponent, UsersComponent } from './components/user/users/users.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    UserComponent,
    UserDeletionConfirmationComponent
  ],
  imports: [
    SharedModule, UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
