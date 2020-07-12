import {Component, OnInit} from '@angular/core';
import {User} from "../../api/models/user";
import {ContextService} from "../../services/context-service";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(private contextService: ContextService, private paintingService: PaintingsService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.user = this.contextService.getCurrentUser();
    this.getPaintings();
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
    this.getPaintings();

  }

}
