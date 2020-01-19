import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RootComponent} from "./root/root.component";
import {ROUTING} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    RootComponent, LoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
