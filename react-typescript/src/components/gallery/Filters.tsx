import React from "react";
import {Button, ClickAwayListener, Paper, Popper} from "@material-ui/core";
import '../../styles/gallery/filters.scss';
import CheckboxGroup from "../shared/CheckboxGroup";
import Range, {RangeModel} from "../shared/Range";
import {apiService} from "../../api";
import {PaintingsParametersResponse} from "../../api/api";

type FiltersProps = {};
type FiltersState = {
    genresPopupAnchor?: any, sizesPopupAnchor?: any, pricePopupAnchor?: any, selectedGenres?: string[],
    filteredWidth?: RangeModel, filteredHeight?: RangeModel, filteredPrice?: RangeModel
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
        this.setState({selectedGenres: genres});
    }

    setFilteredWidth(value: RangeModel) {
        this.setState({filteredWidth: value});
    }

    setFilteredHeight(value: RangeModel) {
        this.setState({filteredHeight: value});
    }

    setFilteredPrice(value: RangeModel) {
        this.setState({filteredPrice: value});
    }

    render() {
        return (
            <div className="filters">
                <ClickAwayListener onClickAway={() => this.closeGenresPopup()}>
                    <div className="filter-button">
                        <Button variant="contained" onClick={(event) => this.openGenresPopup(event)}>Genres</Button>
                        <Popper open={!!this.state.genresPopupAnchor} anchorEl={this.state.genresPopupAnchor} placement="bottom-start">
                            <Paper elevation={3}><div className="side-padding-16">
                                <CheckboxGroup items={this.genres} vertical={true} onSelectedItemsChange={this.setSelectedGenres}/>
                            </div></Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => this.closeSizesPopup()}>
                    <div className="filter-button">
                        <Button variant="contained" onClick={(event) => this.openSizesPopup(event)}>Sizes</Button>
                        <Popper open={!!this.state.sizesPopupAnchor} anchorEl={this.state.sizesPopupAnchor} placement="bottom-start">
                            <Paper elevation={3}><div className="side-padding-16 vertical-padding-16">
                                <Range
                                    name="Width"
                                    placeholder1={'from ' + this.parameters?.minWidth + 'cm'}
                                    placeholder2={'to ' + this.parameters?.maxWidth + 'cm'}
                                    value={this.state.filteredWidth}
                                    onValueChange={this.setFilteredWidth}
                                />
                                <Range
                                    name="Height"
                                    placeholder1={'from ' + this.parameters?.minHeight + 'cm'}
                                    placeholder2={'to ' + this.parameters?.maxHeight + 'cm'}
                                    value={this.state.filteredHeight}
                                    onValueChange={this.setFilteredHeight}
                                />
                            </div></Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => this.closePricePopup()}>
                    <div className="filter-button">
                        <Button variant="contained" onClick={(event) => this.openPricePopup(event)}>Price</Button>
                        <Popper open={!!this.state.pricePopupAnchor} anchorEl={this.state.pricePopupAnchor} placement="bottom-start">
                            <Paper elevation={3}><div className="side-padding-16 vertical-padding-16">
                                <Range
                                    name="Price"
                                    placeholder1={'from ' + this.parameters?.minPrice + ' BYN'}
                                    placeholder2={'to ' + this.parameters?.maxPrice + ' BYN'}
                                    value={this.state.filteredPrice}
                                    onValueChange={this.setFilteredPrice}
                                />
                            </div></Paper>
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