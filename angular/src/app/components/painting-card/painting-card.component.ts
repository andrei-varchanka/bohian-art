import {Component, Input, OnInit} from '@angular/core';
import {Painting} from "../../api/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  painting: Painting;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  getImageSrc() {
    if (this.painting) {
      return this.painting.image.data;
    }
  }

  open() {
    this.router.navigate(['/gallery/' + this.painting.id]);
  }


}
