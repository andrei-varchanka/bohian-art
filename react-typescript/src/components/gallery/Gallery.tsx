import React from 'react';
import {apiService} from "../../api";
import {Painting} from "../../api/api";
import '../../styles/gallery/gallery.scss';
import PaintingCard from "./PaintingCard";
import Pagination from '@material-ui/lab/Pagination';
import Filters from "./Filters";

type GalleryProps = {};
type GalleryState = {
    paintings?: Array<Painting>, count?: number, totalPages?: number
};

class Gallery extends React.Component<GalleryProps, GalleryState> {

    page = 1;
    limit = 12;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        await this.getPaintings();
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

    getQueryParams() {
        const queryParams = [this.page, this.limit];
        // if (this.filteredGenres && this.filteredGenres.length > 0) {
        //     queryParams.genres = this.filteredGenres.join(',');
        // }
        // if (this.filteredWidth && this.filteredWidth.value1) {
        //     queryParams.widthFrom = this.filteredWidth.value1;
        // }
        // if (this.filteredWidth && this.filteredWidth.value2) {
        //     queryParams.widthTo = this.filteredWidth.value2;
        // }
        // if (this.filteredHeight && this.filteredHeight.value1) {
        //     queryParams.heightFrom = this.filteredHeight.value1;
        // }
        // if (this.filteredHeight && this.filteredHeight.value2) {
        //     queryParams.heightTo = this.filteredHeight.value2;
        // }
        // if (this.filteredPrice && this.filteredPrice.value1) {
        //     queryParams.priceFrom = this.filteredPrice.value1;
        // }
        // if (this.filteredPrice && this.filteredPrice.value2) {
        //     queryParams.priceTo = this.filteredPrice.value2;
        // }
        // if (this.filteredUserId) {
        //     queryParams.userId = this.filteredUserId;
        // }
        return queryParams;
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

    render() {
        return (
            <div className="gallery">
                <div className="filters"><Filters/></div>
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
