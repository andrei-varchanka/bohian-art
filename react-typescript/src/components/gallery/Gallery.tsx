import React from 'react';
import {paintingService, userService} from "../../api";
import {Painting} from "../../api/api";
import '../../styles/gallery/gallery.scss';
import PaintingCard from "./PaintingCard";
import Pagination from '@material-ui/lab/Pagination';
import Filters from "./Filters";
import {RangeModel} from "../shared/Range";
import qs from 'query-string';
import {LinearProgress} from "@material-ui/core";

type GalleryProps = { location: any, history: any };
type GalleryState = {
    paintings?: Array<Painting>, count?: number, totalPages?: number, filteredGenres?: string[],
    filteredWidth?: RangeModel, filteredHeight?: RangeModel, filteredPrice?: RangeModel, loading: boolean
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
            filteredPrice: {},
            loading: true
        };
        this.onFilterApply = this.onFilterApply.bind(this);
    }

    async componentDidMount() {
        this.getFiltersFromUrl();
        const response = await userService.getAllUsers();
        setTimeout(async () => {await this.getPaintings()}, 0);
    }

    getFiltersFromUrl() {
        let query = new URLSearchParams(this.props.location.search);
        let filteredGenres: string[] = [];
        let filteredWidth = new RangeModel();
        let filteredHeight = new RangeModel();
        let filteredPrice = new RangeModel();
        if (query.get('genres')) {
            filteredGenres = (query.get('genres') + '').split(',');
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
        this.setState({filteredGenres, filteredWidth, filteredHeight, filteredPrice});
    }

    async getPaintings() {
        const paramsObj = this.getQueryParams();
        // @ts-ignore
        const params = Object.keys(paramsObj).map(key => paramsObj[key]);
        const response = (await paintingService.getAllPaintings(...params)).data;
        console.log(response);
        this.setState({
            paintings: response.paintings,
            count: response.count,
            totalPages: response.totalPages,
            loading: false
        });
    }

    getQueryParams() {
        return {
            page: this.page,
            limit: this.limit,
            userId: undefined,
            price_from: this.state.filteredPrice?.value1 || undefined,
            price_to: this.state.filteredPrice?.value2 || undefined,
            width_from: this.state.filteredWidth?.value1 || undefined,
            width_to: this.state.filteredWidth?.value2 || undefined,
            height_from: this.state.filteredHeight?.value1 || undefined,
            height_to: this.state.filteredHeight?.value2 || undefined,
            genres: this.state.filteredGenres?.join(',') || undefined
        };
    }

    changePage(event: React.ChangeEvent<unknown>, value: number) {
        this.page = value;
        this.refresh();
    }

    refresh() {
        const queryStr = qs.stringify(this.getQueryParams());
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + new URLSearchParams(queryStr).toString()
        });
        // update
        this.getPaintings();
    }

    onFilterApply(filteredGenres: string[], filteredWidth: RangeModel, filteredHeight: RangeModel, filteredPrice: RangeModel) {
        this.setState({filteredGenres, filteredWidth, filteredHeight, filteredPrice});
        setTimeout(() => this.refresh(), 0);
    }

    render() {
        if (this.state.loading) {
            return (
                <LinearProgress />
            )
        }
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
