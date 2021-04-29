import React from "react";
import {Button, ClickAwayListener, Paper, Popper} from "@material-ui/core";
import '../../styles/gallery/filters.scss';
import CheckboxGroup from "../shared/CheckboxGroup";

type FiltersProps = {};
type FiltersState = {
    genresPopupAnchor?: any, sizesPopupAnchor?: any, pricePopupAnchor?: any, selectedGenres?: string[]
};

class Filters extends React.Component<FiltersProps, FiltersState> {

    genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

    constructor(props: any) {
        super(props);
        this.state = {};
        this.setSelectedGenres = this.setSelectedGenres.bind(this);
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

    render() {
        return (
            <div className="filters">
                <ClickAwayListener onClickAway={() => this.closeGenresPopup()}>
                    <div className="filter-button">
                        <Button variant="contained" onClick={(event) => this.openGenresPopup(event)}>Genres</Button>
                        <Popper open={!!this.state.genresPopupAnchor} anchorEl={this.state.genresPopupAnchor} placement="bottom-start">
                            <Paper elevation={3}><div className="popper-content">
                                <CheckboxGroup items={this.genres} vertical={true} onSelectedItemsChange={this.setSelectedGenres}/>
                            </div></Paper>
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
        );
    }
}

export default Filters;