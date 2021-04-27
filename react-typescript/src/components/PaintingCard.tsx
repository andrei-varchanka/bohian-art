import React from "react";
import {Painting} from "../api/";
import '../styles/painting-card.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            <Card className="painting-card">
                <CardActionArea>
                    <CardMedia component="img" alt={this.painting?.name} height="300" src={this.painting?.image.data}/>
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