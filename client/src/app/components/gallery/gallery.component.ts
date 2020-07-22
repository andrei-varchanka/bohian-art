import {Component, OnInit} from '@angular/core';
import {User} from "../../api/models/user";
import {ContextService} from "../../services/context-service";
import {PaintingsService} from "../../api/services/paintings.service";
import {Painting} from "../../api/models/painting";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PaintingsParametersResponse} from "../../api/models";
import {RangeModel} from "../range/range.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  paintings: Painting[];

  parameters: PaintingsParametersResponse;

  genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

  filteredGenres: string[] = [];

  filteredWidth: RangeModel = {};

  filteredHeight: RangeModel = {};

  filteredPrice: RangeModel = {};

  filteredUserId: string;

  user: User;

  page = 1;

  limit = 12;

  count: number;

  constructor(private contextService: ContextService, private paintingService: PaintingsService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.contextService.getCurrentUser();
    this.getFiltersFromUrl();
    this.getParameters();
    this.getPaintings();
  }

  getFiltersFromUrl() {
    if (this.route.snapshot.queryParams.genres) {
      this.filteredGenres = (this.route.snapshot.queryParams.genres + '').split(',');
    }
    if (this.route.snapshot.queryParams.width_from) {
      this.filteredWidth.value1 = +this.route.snapshot.queryParams.width_from;
    }
    if (this.route.snapshot.queryParams.width_to) {
      this.filteredWidth.value2 = +this.route.snapshot.queryParams.width_to;
    }
    if (this.route.snapshot.queryParams.height_from) {
      this.filteredHeight.value1 = +this.route.snapshot.queryParams.height_from;
    }
    if (this.route.snapshot.queryParams.height_to) {
      this.filteredHeight.value2 = +this.route.snapshot.queryParams.height_to;
    }
    if (this.route.snapshot.queryParams.price_from) {
      this.filteredPrice.value1 = +this.route.snapshot.queryParams.price_from;
    }
    if (this.route.snapshot.queryParams.price_to) {
      this.filteredPrice.value2 = +this.route.snapshot.queryParams.price_to;
    }
    if (this.route.snapshot.queryParams.userId) {
      this.filteredUserId = this.route.snapshot.queryParams.userId;
    }
  }

  getParameters() {
    this.paintingService.getParameters().subscribe(response => {
      this.parameters = response;
    });
  }

  getPaintings() {
    this.paintingService.getAllPaintings(this.getQueryParams()).subscribe(response => {
      this.paintings = response.paintings;
      this.count = response.count;
    });
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
    const queryParams: Params = { };
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
    console.log(event);
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.refresh();
  }

  clearFilters() {
    window.location.search = '';
  }

}
