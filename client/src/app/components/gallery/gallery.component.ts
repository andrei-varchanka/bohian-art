import {Component, OnInit} from '@angular/core';
import {User} from "../../api/models/user";
import {ContextService} from "../../services/context-service";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  paintings: Painting[];

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  selectedGenres: string[] = [];

  user: User;

  constructor(private contextService: ContextService, private paintingService: PaintingsService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.contextService.getCurrentUser();
    this.getFiltersFromUrl();
    this.getPaintings();
  }

  getFiltersFromUrl() {
    if (this.route.snapshot.queryParams.genres) {
      this.selectedGenres = (this.route.snapshot.queryParams.genres + '').split(',');
    }
  }

  getPaintings() {
    this.paintingService.getAllPaintings({genres: this.selectedGenres.join(',')}).subscribe(response => {
      this.paintings = response.paintings;
    });
  }

  selectGenres(genres: string[]) {
    this.selectedGenres = genres;
  }

  refresh() {
    const queryParams: Params = { };
    if (this.genres) {
      queryParams.genres = this.selectedGenres.join(',');
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams
      });
    this.getPaintings();

  }

}
