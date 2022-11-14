import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {MaterialModules} from "./imports/material-modules";
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
import {JwtInterceptor} from "./interceptors/jwt-interceptor";
import {PaintingCardComponent} from './components/painting-card/painting-card.component';
import {RegistrationComponent} from './components/registration/registration.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {AngularYandexMapsModule, IConfig, YA_MAP_CONFIG} from "angular8-yandex-maps";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/reducers/app.reducers';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './store/reducers/meta.reducers';
import { PaintingEffects } from './store/effects/painting.effects';
import { SharedModule } from './modules/shared/shared.module';

const mapConfig: IConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
    declarations: [
        AppComponent,
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
        PaintingCardComponent,
        RegistrationComponent,
        ContactsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModules,
        AngularYandexMapsModule.forRoot(mapConfig),
        ApiModule.forRoot({ rootUrl: 'http://localhost:3000' }),
        StoreModule.forRoot(appReducers, {metaReducers}),
        EffectsModule.forRoot([UserEffects, PaintingEffects]),
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
