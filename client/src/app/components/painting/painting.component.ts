import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {User} from "../../api/models/user";
import {mergeMap} from "rxjs/operators";
import {UsersService} from "../../api/services/users.service";

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

  painting: Painting;

  user: User;

  constructor(private route: ActivatedRoute, private paintingService: PaintingsService, private userService: UsersService) {
  }

  ngOnInit() {
    const paintingId = this.route.snapshot.params.id;
    this.paintingService.getPainting(paintingId).pipe(mergeMap(response => {
      this.painting = response.painting;
      return this.userService.getUser(this.painting.userId);
    })).subscribe(response => {
      this.user = response.user;
    });
  }

  getImageSrc() {
    if (this.painting) {
      return this.painting.image.data;
    }
  }

}
