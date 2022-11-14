import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {PaintingComponent} from "./components/painting/painting.component";
import {PaintingEditorComponent} from "./components/painting-editor/painting-editor.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import { AuthGuard } from './modules/shared/guards/auth-guard';

const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'gallery/:id', component: PaintingComponent},
  {
    path: 'users',
    loadChildren: () => import('./modules/user-management/user-management.module').then((m) => m.UserManagementModule),
  },
  {path: 'painting-editor', component: PaintingEditorComponent, canActivate: [AuthGuard]},
  {path: 'painting-editor/:id', component: PaintingEditorComponent, canActivate: [AuthGuard]},
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
