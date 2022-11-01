import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {User} from "../../api/models/user";
import {mergeMap} from "rxjs/operators";
import {UsersService} from "../../api/services/users.service";
import { MatDialog } from "@angular/material/dialog";
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

  painting: Painting;

  user: User;

  currentUser: User;

  constructor(private route: ActivatedRoute, private paintingService: PaintingsService, private userService: UsersService,
              public dialog: MatDialog, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
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

  delete() {
    const dialogRef = this.dialog.open(PaintingDeletionConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paintingService.deletePainting(this.painting.id).subscribe(response => {
          this.router.navigate(['/']);
        });
      }
    });
  }

}

@Component({
  selector: 'app-painting-deletion-confirmation',
  templateUrl: './painting-deletion-confirmation.html',
})
export class PaintingDeletionConfirmationComponent {}
