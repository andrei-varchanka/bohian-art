import React from "react";
import {Painting} from "../api/";
import '../styles/painting-card.scss';

type PaintingCardProps = {painting?: Painting};
type PaintingCardState = {};
class PaintingCard extends React.Component<PaintingCardProps, PaintingCardState> {

    painting: Painting;

    constructor(props: any) {
        super(props);
        this.painting = props.painting;
    }

    render() {
        return (
            <img className="painting-card" src={this.painting?.image.data} alt={this.painting?.name} />
        );
    }
}

export default PaintingCard;