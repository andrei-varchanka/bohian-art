import React from 'react';
import {apiService} from "../../api";
import {Painting} from "../../api/api";
import '../../styles/gallery.scss';
import PaintingCard from "./PaintingCard";
import Pagination from '@material-ui/lab/Pagination';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Popper, Paper, ClickAwayListener
} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";


type GalleryProps = {};
type GalleryState = {
    paintings?: Array<Painting>, count?: number, totalPages?: number, genresPopupAnchor?: any, sizesPopupAnchor?: any,
    pricePopupAnchor?: any
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

    openGenresPopup(event: React.MouseEvent<HTMLElement>) {
        this.setState({genresPopupAnchor: event.currentTarget});
    }

    closeGenresPopup() {
        this.setState({genresPopupAnchor: null});
    }

    openSizesPopup(event: React.MouseEvent<HTMLElement>) {
        this.setState({sizesPopupAnchor: event.currentTarget});
    }

    closeSizesPopup() {
        this.setState({sizesPopupAnchor: null});
    }

    openPricePopup(event: React.MouseEvent<HTMLElement>) {
        this.setState({pricePopupAnchor: event.currentTarget});
    }

    closePricePopup() {
        this.setState({pricePopupAnchor: null});
    }

    render() {
        return (
            <div className="gallery">
                <div className="filters">
                    <ClickAwayListener onClickAway={() => this.closeGenresPopup()}>
                        <div className="filter-button">
                            <Button variant="contained" onClick={(event) => this.openGenresPopup(event)}>Genres</Button>
                            <Popper open={!!this.state.genresPopupAnchor} anchorEl={this.state.genresPopupAnchor} placement="bottom-start">
                                <Paper elevation={3}><div>The content of the Popper.</div></Paper>
                            </Popper>
                        </div>
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => this.closeSizesPopup()}>
                        <div className="filter-button">
                            <Button variant="contained" onClick={(event) => this.openSizesPopup(event)}>Sizes</Button>
                            <Popper open={!!this.state.sizesPopupAnchor} anchorEl={this.state.sizesPopupAnchor} placement="bottom-start">
                                <Paper elevation={3}><div>The content of the Popper.</div></Paper>
                            </Popper>
                        </div>
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => this.closePricePopup()}>
                        <div className="filter-button">
                            <Button variant="contained" onClick={(event) => this.openPricePopup(event)}>Price</Button>
                            <Popper open={!!this.state.pricePopupAnchor} anchorEl={this.state.pricePopupAnchor} placement="bottom-start">
                                <Paper elevation={3}><div>The content of the Popper.</div></Paper>
                            </Popper>
                        </div>
                    </ClickAwayListener>
                    <Button className="filter-button">Apply</Button>
                    <Button className="filter-button">Clear</Button>
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
