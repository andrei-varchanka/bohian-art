import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  name: string;

  @Input()
  author: string;

  @Input()
  price: number;

  constructor() { }

  ngOnInit() {
  }

}
