import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from "../../api/models/user";
import { Painting } from "../../api/models/painting";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PaintingsParametersResponse } from "../../api/models";
import { RangeModel } from "../../modules/shared/components/range/range.component";
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { getPaintingsAction, getPaintingsParametersAction } from 'src/app/store/actions/painting.actions';
import { Observable } from 'rxjs';
import { selectPaintings, selectPaintingsCount, selectPaintingsParameters } from 'src/app/store/selectors/painting.selectors';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  paintings$: Observable<Painting[]>;

  parameters$: Observable<PaintingsParametersResponse>;

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  filteredGenres: string[] = [];

  filteredWidth: RangeModel = {};

  filteredHeight: RangeModel = {};

  filteredPrice: RangeModel = {};

  filteredUserId: string;

  user: User;

  page = 1;

  limit = 12;

  count$: Observable<number>;

  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getFiltersFromUrl();
    this.getParameters();
    this.getPaintings();
    this.paintings$ = this.store.select(selectPaintings);
    this.count$ = this.store.select(selectPaintingsCount);
    this.parameters$ = this.store.select(selectPaintingsParameters);
  }

  getFiltersFromUrl() {
    if (this.route.snapshot.queryParams.genres) {
      this.filteredGenres = (this.route.snapshot.queryParams.genres + '').split(',');
    }
    if (this.route.snapshot.queryParams.widthFrom) {
      this.filteredWidth.value1 = +this.route.snapshot.queryParams.widthFrom;
    }
    if (this.route.snapshot.queryParams.widthTo) {
      this.filteredWidth.value2 = +this.route.snapshot.queryParams.widthTo;
    }
    if (this.route.snapshot.queryParams.heightFrom) {
      this.filteredHeight.value1 = +this.route.snapshot.queryParams.heightFrom;
    }
    if (this.route.snapshot.queryParams.heightTo) {
      this.filteredHeight.value2 = +this.route.snapshot.queryParams.heightTo;
    }
    if (this.route.snapshot.queryParams.priceFrom) {
      this.filteredPrice.value1 = +this.route.snapshot.queryParams.priceFrom;
    }
    if (this.route.snapshot.queryParams.priceTo) {
      this.filteredPrice.value2 = +this.route.snapshot.queryParams.priceTo;
    }
    if (this.route.snapshot.queryParams.userId) {
      this.filteredUserId = this.route.snapshot.queryParams.userId;
    }
  }

  getParameters() {
    this.store.dispatch(getPaintingsParametersAction());
  }

  getPaintings() {
    this.store.dispatch(getPaintingsAction({ params: this.getQueryParams() }));
  }

  setFilteredGenres(genres: string[]) {
    this.filteredGenres = genres;
  }

  setFilteredWidth(range: RangeModel) {
    this.filteredWidth = range;
  }

  setFilteredHeight(range: RangeModel) {
    this.filteredHeight = range;
  }

  setFilteredPrice(range: RangeModel) {
    this.filteredPrice = range;
  }

  getQueryParams() {
    const queryParams: Params = {};
    queryParams.page = this.page;
    queryParams.limit = this.limit;
    if (this.filteredGenres && this.filteredGenres.length > 0) {
      queryParams.genres = this.filteredGenres.join(',');
    }
    if (this.filteredWidth && this.filteredWidth.value1) {
      queryParams.widthFrom = this.filteredWidth.value1;
    }
    if (this.filteredWidth && this.filteredWidth.value2) {
      queryParams.widthTo = this.filteredWidth.value2;
    }
    if (this.filteredHeight && this.filteredHeight.value1) {
      queryParams.heightFrom = this.filteredHeight.value1;
    }
    if (this.filteredHeight && this.filteredHeight.value2) {
      queryParams.heightTo = this.filteredHeight.value2;
    }
    if (this.filteredPrice && this.filteredPrice.value1) {
      queryParams.priceFrom = this.filteredPrice.value1;
    }
    if (this.filteredPrice && this.filteredPrice.value2) {
      queryParams.priceTo = this.filteredPrice.value2;
    }
    if (this.filteredUserId) {
      queryParams.userId = this.filteredUserId;
    }
    return queryParams;
  }

  refresh() {
    // to add query params to url
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParams()
      });
    // update
    this.getPaintings();

  }

  changePageOrLimit(event) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.refresh();
  }

  clearFilters() {
    window.location.search = '';
  }
}
