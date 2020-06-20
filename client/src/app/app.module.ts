import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {MaterialModules} from "./imports/material-modules";
import {HomeComponent} from './components/home/home.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {PaintingComponent} from './components/painting/painting.component';
import {LoginComponent} from './components/login/login.component';
import {PaintingAddingComponent} from './components/painting-adding/painting-adding.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DragDropDirective} from "./directives/drag-drop.directive";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {ImageUploaderComponent} from "./components/image-uploader/image-uploader.component";
import { PlaygroundComponent } from './components/playground/playground.component';
import {ApiModule} from "./api/api.module";
import {CookieService} from "ngx-cookie-service";
import {ContextService} from "./services/context-service";
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import {JwtInterceptor} from "./interceptors/jwt-interceptor";
import { PaintingCardComponent } from './components/painting-card/painting-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    PaintingComponent,
    LoginComponent,
    PaintingAddingComponent,
    HeaderComponent,
    FooterComponent,
    ImageUploaderComponent,
    DragDropDirective,
    SafeHtmlPipe,
    PlaygroundComponent,
    CheckboxGroupComponent,
    PaintingCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules,
    ApiModule.forRoot({ rootUrl: 'http://localhost:3000'})
  ],
  providers: [
    RouterModule, CookieService, ContextService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
