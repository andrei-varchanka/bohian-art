import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      { path: '', component: UsersComponent, canActivate: [AuthGuard] },
      { path: ':id', component: UserComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
