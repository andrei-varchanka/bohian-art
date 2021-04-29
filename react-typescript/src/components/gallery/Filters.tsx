import React from "react";
import {Badge, Button, ClickAwayListener, Paper, Popper} from "@material-ui/core";
import '../../styles/gallery/filters.scss';
import CheckboxGroup from "../shared/CheckboxGroup";
import Range, {RangeModel} from "../shared/Range";
import {apiService} from "../../api";
import {PaintingsParametersResponse} from "../../api/api";

type FiltersProps = {
    filteredGenres?: string[], filteredWidth?: RangeModel, filteredHeight?: RangeModel, filteredPrice?: RangeModel,
    onGenresChange?: Function, onWidthChange?: Function, onHeightChange?: Function, onPriceChange?: Function
};
type FiltersState = {
    genresPopupAnchor?: any, sizesPopupAnchor?: any, pricePopupAnchor?: any
};

class Filters extends React.Component<FiltersProps, FiltersState> {

    genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

    parameters: PaintingsParametersResponse | undefined;

    constructor(props: any) {
        super(props);
        this.state = {};
        this.setSelectedGenres = this.setSelectedGenres.bind(this);
        this.setFilteredWidth = this.setFilteredWidth.bind(this);
        this.setFilteredHeight = this.setFilteredHeight.bind(this);
        this.setFilteredPrice = this.setFilteredPrice.bind(this);
    }

    async componentDidMount() {
        this.parameters = (await apiService.getParameters()).data;
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
        if (this.props.onGenresChange) {
            this.props.onGenresChange(genres);
        }
    }

    setFilteredWidth(value: RangeModel) {
        if (this.props.onWidthChange) {
            this.props.onWidthChange(!value.value1 && !value.value2 ? undefined : value)
        }
    }

    setFilteredHeight(value: RangeModel) {
        if (this.props.onHeightChange) {
            this.props.onHeightChange(!value.value1 && !value.value2 ? undefined : value)
        }
    }

    setFilteredPrice(value: RangeModel) {
        if (this.props.onPriceChange) {
            this.props.onPriceChange(!value.value1 && !value.value2 ? undefined : value)
        }
    }

    render() {
        return (
            <div className="filters">
                <ClickAwayListener onClickAway={() => this.closeGenresPopup()}>
                    <div className="filter-button">
                        <Badge color="secondary" badgeContent={this.props.filteredGenres?.length}>
                            <Button variant="contained" onClick={(event) => this.openGenresPopup(event)}>Genres</Button>
                        </Badge>
                        <Popper open={!!this.state.genresPopupAnchor} anchorEl={this.state.genresPopupAnchor}
                                placement="bottom-start">
                            <Paper elevation={3}>
                                <div className="side-padding-16">
                                    <CheckboxGroup
                                        items={this.genres}
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
                            badgeContent={this.props.filteredWidth?.value1 || this.props.filteredWidth?.value2 ||
                            this.props.filteredHeight?.value1 || this.props.filteredHeight?.value2 ? '!' : null}>
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
                                        value={this.props.filteredWidth}
                                        onValueChange={this.setFilteredWidth}
                                    />
                                    <Range
                                        name="Height"
                                        placeholder1={'from ' + this.parameters?.minHeight + 'cm'}
                                        placeholder2={'to ' + this.parameters?.maxHeight + 'cm'}
                                        value={this.props.filteredHeight}
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
                            badgeContent={this.props.filteredPrice?.value1 || this.props.filteredPrice?.value2 ? '!' : null}>
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
                                        value={this.props.filteredPrice}
                                        onValueChange={this.setFilteredPrice}
                                    />
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <Button className="filter-button">Apply</Button>
                <Button className="filter-button">Clear</Button>
            </div>
        );
    }
}

export default Filters;