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

  array: any[];

  paintings: Painting[];

  user: User;

  constructor(private contextService: ContextService, private paintingService: PaintingsService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.user = this.contextService.getCurrentUser();
    this.array = Array.from(Array(20), (x, i) => i);
    this.paintingService.getAllPaintings().subscribe(response => {
      this.paintings = response.paintings;
    });
  }

}
