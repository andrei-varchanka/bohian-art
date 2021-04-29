import React from 'react';
import {apiService} from "../../api";
import {Painting} from "../../api/api";
import '../../styles/gallery/gallery.scss';
import PaintingCard from "./PaintingCard";
import Pagination from '@material-ui/lab/Pagination';
import Filters from "./Filters";
import {RangeModel} from "../shared/Range";

type GalleryProps = { location: any };
type GalleryState = {
    paintings?: Array<Painting>, count?: number, totalPages?: number, filteredGenres?: string[],
    filteredWidth?: RangeModel, filteredHeight?: RangeModel, filteredPrice?: RangeModel
};

class Gallery extends React.Component<GalleryProps, GalleryState> {

    page = 1;
    limit = 12;

    constructor(props: any) {
        super(props);
        this.state = {
            filteredGenres: [],
            filteredWidth: {},
            filteredHeight: {},
            filteredPrice: {}
        };
        this.onFilterApply = this.onFilterApply.bind(this);
    }

    async componentDidMount() {
        this.getFiltersFromUrl();
        await this.getPaintings();
    }

    getFiltersFromUrl() {
        let query = new URLSearchParams(this.props.location.search);
        let filteredWidth = new RangeModel();
        let filteredHeight = new RangeModel();
        let filteredPrice = new RangeModel();
        if (query.get('genres')) {
            this.setState({filteredGenres: (query.get('genres') + '').split(',')});
        }
        if (query.get('width_from')) {
            filteredWidth.value1 = +(query.get('width_from') || 0);
        }
        if (query.get('width_to')) {
            filteredWidth.value2 = +(query.get('width_to') || 0);
        }
        if (query.get('height_from')) {
            filteredHeight.value1 = +(query.get('height_from') || 0);
        }
        if (query.get('height_to')) {
            filteredHeight.value2 = +(query.get('height_to') || 0);
        }
        if (query.get('price_from')) {
            filteredPrice.value1 = +(query.get('price_from') || 0);
        }
        if (query.get('price_to')) {
            filteredPrice.value2 = +(query.get('price_to') || 0);
        }
        this.setState({filteredWidth, filteredHeight, filteredPrice});
    }

    async getPaintings() {
        const response = (await apiService.getAllPaintings(...this.getQueryParams())).data;
        console.log(response);
        this.setState({
            paintings: response.paintings,
            count: response.count,
            totalPages: response.totalPages
        })
    }

    getQueryParams(): [number?, number?, string?, number?, number?, number?, number?, number?, number?, string?] {
        return [
            this.page,
            this.limit,
            undefined,
            this.state.filteredPrice?.value1 || undefined,
            this.state.filteredPrice?.value2 || undefined,
            this.state.filteredWidth?.value1 || undefined,
            this.state.filteredWidth?.value2 || undefined,
            this.state.filteredHeight?.value1 || undefined,
            this.state.filteredHeight?.value2 || undefined,
            this.state.filteredGenres?.join(',') || undefined
        ];
    }

    changePage(event: React.ChangeEvent<unknown>, value: number) {
        this.page = value;
        this.refresh();
    }

    refresh() {
        // to add query params to url
        // this.router.navigate(
        //     [],
        //     {
        //         relativeTo: this.route,
        //         queryParams: this.getQueryParams()
        //     });
        // update
        this.getPaintings();
    }

    onFilterApply(filteredGenres: string[], filteredWidth: RangeModel, filteredHeight: RangeModel, filteredPrice: RangeModel) {
        this.setState({filteredGenres, filteredWidth, filteredHeight, filteredPrice});
        setTimeout(() => this.refresh(), 0);
    }

    render() {
        return (
            <div className="gallery">
                <div className="filters">
                    <Filters filteredGenres={this.state.filteredGenres} filteredWidth={this.state.filteredWidth}
                             filteredHeight={this.state.filteredHeight} filteredPrice={this.state.filteredPrice}
                             onApply={this.onFilterApply}
                    />
                </div>
                <div className="items">
                    {this.state.paintings?.map(painting => {
                        return <div className="item" key={painting?.name}><PaintingCard painting={painting}/></div>;
                    })}
                </div>
                <div className="paginator">
                    <Pagination count={this.state.totalPages} onChange={(event, page) => this.changePage(event, page)}/>
                </div>
            </div>
        );
    }
}

export default Gallery;
