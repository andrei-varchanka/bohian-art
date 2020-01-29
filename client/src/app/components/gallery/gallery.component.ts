import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  array: any[];

  constructor() {
  }

  ngOnInit() {
    this.array = Array.from(Array(20), (x, i) => i);
  }

}
