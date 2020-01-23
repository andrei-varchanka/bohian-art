import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {HomeComponent} from "./components/home/home.component";
import {PaintingComponent} from "./components/painting/painting.component";
import {PaintingAddingComponent} from "./components/painting-adding/painting-adding.component";

const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'home', component: HomeComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'gallery/:id', component: PaintingComponent},
  {path: 'add-painting', component: PaintingAddingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
