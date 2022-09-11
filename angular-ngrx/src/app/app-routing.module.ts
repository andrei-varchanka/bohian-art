import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {HomeComponent} from "./components/home/home.component";
import {PaintingComponent} from "./components/painting/painting.component";
import {PaintingEditorComponent} from "./components/painting-editor/painting-editor.component";
import {PlaygroundComponent} from "./components/playground/playground.component";
import {AuthGuard} from "./components/guards/auth-guard";
import {RegistrationComponent} from "./components/registration/registration.component";
import {UserComponent} from "./components/user/user.component";
import {UsersComponent} from "./components/users/users.component";
import {ContactsComponent} from "./components/contacts/contacts.component";

const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'gallery/:id', component: PaintingComponent},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'painting-editor', component: PaintingEditorComponent, canActivate: [AuthGuard]},
  {path: 'painting-editor/:id', component: PaintingEditorComponent, canActivate: [AuthGuard]},
  {path: 'playground', component: PlaygroundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
