import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {getImageSrc} from "../../utils/image";

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

  painting: Painting;

  constructor(private route: ActivatedRoute, private paintingService: PaintingsService) {
  }

  ngOnInit() {
    const paintingId = this.route.snapshot.params.id;
    this.paintingService.getPainting(paintingId).subscribe(response => {
      this.painting = response.painting;
    });
  }

  getImageSrc() {
    if (this.painting) {
      return getImageSrc(this.painting);
    }
  }

}
