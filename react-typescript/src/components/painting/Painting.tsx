import React from "react";
import '../../styles/painting/painting.scss';
import {Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import {paintingService, userService} from "../../services/api";
import {mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Painting as PaintingModel} from "../../api/";
import {User as UserModel} from "../../api/";
import storageService from "../../services/storage";
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type PaintingProps = { match: any, history: any };
type PaintingState = { painting: PaintingModel, user: UserModel, deleteConfirmationOpened: boolean };

class Painting extends React.Component<PaintingProps, PaintingState> {

    paintingId: string;

    currentUser: UserModel;

    constructor(props: any) {
        super(props);
        this.state = {
            painting: null,
            user: null,
            deleteConfirmationOpened: false
        }
    }

    componentDidMount(): void {
        this.paintingId = this.props.match.params.id;
        this.currentUser = storageService.getUser();
        from(paintingService.getPainting(this.paintingId)).pipe(mergeMap(response => {
            this.setState({painting: response.data.painting});
            return from(userService.getUser(this.state.painting.userId));
        })).subscribe(response => {
            this.setState({user: response.data.user});
        });
    }

    openDeleteConfirmationPopup() {
        this.setState({deleteConfirmationOpened: true});
    }

    closeDeleteConfirmationPopup() {
        this.setState({deleteConfirmationOpened: false});
    }

    delete() {
        from(paintingService.deletePainting(this.paintingId)).subscribe(response => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <>{
                this.state.painting && this.state.user &&
                <div className="painting">
                    <Card>
                        <CardMedia component="img" alt={this.state.painting.name} src={this.state.painting.image.data}/>
                    </Card>
                    <div className="details-wrapper">
                        <Card className="details">
                            {
                                (this.state.painting.userId === this.currentUser?.id || this.currentUser?.role === 'Admin') &&
                                <div className="actions">
                                    <Link to={'/painting-editor/' + this.paintingId}><EditIcon/></Link>
                                    <DeleteIcon className="delete-icon" onClick={() => this.openDeleteConfirmationPopup()}/>
                                    <Dialog open={this.state.deleteConfirmationOpened}
                                            onClose={() => this.closeDeleteConfirmationPopup()}>
                                        <DialogTitle>Deletion confirmation</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>Are you sure you what to delete this painting?</DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => this.closeDeleteConfirmationPopup()} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => this.delete()} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            }
                            <div className="field title">{this.state.painting.name}</div>
                            <div className="field">
                                <div className="label">Author:</div>
                                <div className="value">{this.state.painting.author}</div>
                            </div>
                            <div className="field">
                                <div className="label">Genre:</div>
                                <div className="value">{this.state.painting.genres.join(', ')}</div>
                            </div>
                            <div className="field">
                                <div className="label">Size:</div>
                                <div
                                    className="value">{this.state.painting.height + ' x ' + this.state.painting.width + ' (cm)'}</div>
                            </div>
                            <div className="field">
                                <div className="label">Description:</div>
                                <div className="value">{this.state.painting.description}</div>
                            </div>
                        </Card>
                        <Card className="details">
                            <div className="price">{this.state.painting.price + ' BYN'}</div>
                        </Card>
                        <Card className="details">
                            <div className="field subtitle">Contacts</div>
                            {this.state.user.phone &&
                            <div className="field">
                                <div className="label">Phone number:</div>
                                <div className="value">{this.state.user.phone}</div>
                            </div>}
                            <div className="field">
                                <div className="label">E-mail:</div>
                                <div className="value">{this.state.user.email}</div>
                            </div>
                        </Card>
                    </div>
                </div>
            }</>
        );
    }
}

export default Painting;
