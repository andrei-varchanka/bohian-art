import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";

export const AppRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
