import React from "react";
import {Painting} from "../../api/api";
import '../../styles/gallery/painting-card.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from "react-router-dom";

type PaintingCardProps = {painting: Painting};
type PaintingCardState = {};
class PaintingCard extends React.Component<PaintingCardProps, PaintingCardState> {

    painting: Painting;

    constructor(props: any) {
        super(props);
        this.painting = props.painting;
    }

    render() {
        return (
            <Card className="painting-card">
                <CardActionArea>
                    <Link to={'/gallery/' + this.painting.id}>
                        <CardMedia component="img" alt={this.painting?.name} height="300" src={this.painting?.image.data}/>
                    </Link>
                </CardActionArea>
                <CardContent className="content">
                    <div className="left">
                        <div className="name">{this.painting.name}</div>
                        <div className="author">{this.painting.author}</div>
                    </div>
                    <div className="right">
                        {this.painting.price + ' BYN'}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default PaintingCard;