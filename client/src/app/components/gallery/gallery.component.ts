import {Component, OnInit} from '@angular/core';
import {User} from "../../api/models/user";
import {ContextService} from "../../services/context-service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  array: any[];

  user: User;

  constructor(private contextService: ContextService) {
  }

  ngOnInit() {
    this.user = this.contextService.getCurrentUser();
    this.array = Array.from(Array(20), (x, i) => i);
  }

}
