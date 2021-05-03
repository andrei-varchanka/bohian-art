import React from "react";
import {Badge, Button, ClickAwayListener, Paper, Popper} from "@material-ui/core";
import '../../styles/gallery/filters.scss';
import CheckboxGroup from "../shared/CheckboxGroup";
import Range, {RangeModel} from "../shared/Range";
import {paintingService} from "../../api";
import {PaintingsParametersResponse} from "../../api/api";

type FiltersProps = {
    filteredGenres?: string[], filteredWidth?: RangeModel, filteredHeight?: RangeModel, filteredPrice?: RangeModel,
    onApply?: Function
};
type FiltersState = {
    genresPopupAnchor?: any, sizesPopupAnchor?: any, pricePopupAnchor?: any
};

class Filters extends React.Component<FiltersProps, FiltersState> {

    genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

    filteredGenres: string[];
    filteredWidth: RangeModel;
    filteredHeight: RangeModel;
    filteredPrice: RangeModel;


    parameters: PaintingsParametersResponse | undefined;

    constructor(props: any) {
        super(props);
        this.state = {};
        this.filteredGenres = this.props.filteredGenres || [];
        this.filteredWidth = this.props.filteredWidth || new RangeModel();
        this.filteredHeight = this.props.filteredHeight || new RangeModel();
        this.filteredPrice = this.props.filteredPrice || new RangeModel();
        this.setSelectedGenres = this.setSelectedGenres.bind(this);
        this.setFilteredWidth = this.setFilteredWidth.bind(this);
        this.setFilteredHeight = this.setFilteredHeight.bind(this);
        this.setFilteredPrice = this.setFilteredPrice.bind(this);
    }

    async componentDidMount() {
        this.parameters = (await paintingService.getParameters()).data;
        console.log(this.parameters);
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

    setSelectedGenres(genres: string[]) {
        this.filteredGenres = genres;
    }

    setFilteredWidth(value: RangeModel) {
        this.filteredWidth = value;
    }

    setFilteredHeight(value: RangeModel) {
        this.filteredHeight = value;
    }

    setFilteredPrice(value: RangeModel) {
        this.filteredPrice = value;
    }

    apply() {
        if(this.props.onApply) {
            this.props.onApply(this.filteredGenres, this.filteredWidth, this.filteredHeight, this.filteredPrice);
        }
    }

    clear() {
        this.filteredGenres = [];
        this.filteredWidth = new RangeModel();
        this.filteredHeight = new RangeModel();
        this.filteredPrice = new RangeModel();
        this.apply();
    }

    render() {
        return (
            <div className="filters">
                <ClickAwayListener onClickAway={() => this.closeGenresPopup()}>
                    <div className="filter-button">
                        <Badge color="secondary" badgeContent={this.filteredGenres?.length}>
                            <Button variant="contained" onClick={(event) => this.openGenresPopup(event)}>Genres</Button>
                        </Badge>
                        <Popper open={!!this.state.genresPopupAnchor} anchorEl={this.state.genresPopupAnchor}
                                placement="bottom-start">
                            <Paper elevation={3}>
                                <div className="side-padding-16">
                                    <CheckboxGroup
                                        items={this.genres}
                                        value={this.filteredGenres}
                                        vertical={true}
                                        onSelectedItemsChange={this.setSelectedGenres}
                                    />
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => this.closeSizesPopup()}>
                    <div className="filter-button">
                        <Badge
                            color="secondary"
                            badgeContent={this.filteredWidth?.value1 || this.filteredWidth?.value2 ||
                            this.filteredHeight?.value1 || this.filteredHeight?.value2 ? '!' : null}>
                            <Button variant="contained" onClick={(event) => this.openSizesPopup(event)}>Sizes</Button>
                        </Badge>
                        <Popper open={!!this.state.sizesPopupAnchor} anchorEl={this.state.sizesPopupAnchor}
                                placement="bottom-start">
                            <Paper elevation={3}>
                                <div className="side-padding-16 vertical-padding-16">
                                    <Range
                                        name="Width"
                                        placeholder1={'from ' + this.parameters?.minWidth + 'cm'}
                                        placeholder2={'to ' + this.parameters?.maxWidth + 'cm'}
                                        value={this.filteredWidth}
                                        onValueChange={this.setFilteredWidth}
                                    />
                                    <Range
                                        name="Height"
                                        placeholder1={'from ' + this.parameters?.minHeight + 'cm'}
                                        placeholder2={'to ' + this.parameters?.maxHeight + 'cm'}
                                        value={this.filteredHeight}
                                        onValueChange={this.setFilteredHeight}
                                    />
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => this.closePricePopup()}>
                    <div className="filter-button">
                        <Badge
                            color="secondary"
                            badgeContent={this.filteredPrice?.value1 || this.filteredPrice?.value2 ? '!' : null}>
                            <Button variant="contained" onClick={(event) => this.openPricePopup(event)}>Price</Button>
                        </Badge>
                        <Popper open={!!this.state.pricePopupAnchor} anchorEl={this.state.pricePopupAnchor}
                                placement="bottom-start">
                            <Paper elevation={3}>
                                <div className="side-padding-16 vertical-padding-16">
                                    <Range
                                        name="Price"
                                        placeholder1={'from ' + this.parameters?.minPrice + ' BYN'}
                                        placeholder2={'to ' + this.parameters?.maxPrice + ' BYN'}
                                        value={this.filteredPrice}
                                        onValueChange={this.setFilteredPrice}
                                    />
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <Button className="filter-button" onClick={() => this.apply()}>Apply</Button>
                <Button className="filter-button" onClick={() => this.clear()}>Clear</Button>
            </div>
        );
    }
}

export default Filters;