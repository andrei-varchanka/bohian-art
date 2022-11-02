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
import {
  PaintingComponent,
  PaintingDeletionConfirmationComponent
} from './components/painting/painting.component';
import {LoginComponent} from './components/login/login.component';
import {PaintingEditorComponent} from './components/painting-editor/painting-editor.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DragDropDirective} from "./directives/drag-drop.directive";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {ImageUploaderComponent} from "./components/image-uploader/image-uploader.component";
import {ApiModule} from "./api/api.module";
import {CookieService} from "ngx-cookie-service";
import {CheckboxGroupComponent} from './components/checkbox-group/checkbox-group.component';
import {JwtInterceptor} from "./interceptors/jwt-interceptor";
import {PaintingCardComponent} from './components/painting-card/painting-card.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthGuard} from "./guards/auth-guard";
import { UserComponent } from './components/user/user.component';
import { RangeComponent } from './components/range/range.component';
import {UserDeletionConfirmationComponent, UsersComponent} from './components/users/users.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {AngularYandexMapsModule, IConfig, YA_MAP_CONFIG} from "angular8-yandex-maps";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/reducers/app.reducers';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './store/reducers/meta.reducers';

const mapConfig: IConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        GalleryComponent,
        PaintingComponent,
        PaintingDeletionConfirmationComponent,
        LoginComponent,
        PaintingEditorComponent,
        HeaderComponent,
        FooterComponent,
        ImageUploaderComponent,
        DragDropDirective,
        SafeHtmlPipe,
        CheckboxGroupComponent,
        PaintingCardComponent,
        RegistrationComponent,
        UserComponent,
        RangeComponent,
        UsersComponent,
        UserDeletionConfirmationComponent,
        ContactsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModules,
        AngularYandexMapsModule.forRoot(mapConfig),
        ApiModule.forRoot({ rootUrl: 'http://localhost:3000' }),
        StoreModule.forRoot(appReducers, {metaReducers}),
        EffectsModule.forRoot([UserEffects]),
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: false, // Restrict extension to log-only mode
          autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
    ],
    providers: [
        RouterModule,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: YA_MAP_CONFIG, useValue: { apikey: 'API_KEY', lang: 'en_US' } },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
