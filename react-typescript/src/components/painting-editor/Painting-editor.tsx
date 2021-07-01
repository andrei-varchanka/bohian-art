import React from "react";
import {Painting as PaintingModel, User as UserModel} from "../../api";
import * as yup from "yup";
import {paintingService} from "../../services/api";
import {from} from "rxjs";
import ImageUploader from "../shared/ImageUploader";


type PaintingEditorProps = { match: any, history: any };
type PaintingEditorState = { painting: PaintingModel };

class PaintingEditor extends React.Component<PaintingEditorProps, PaintingEditorState> {

    validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        author: yup.string().required('Author is required'),
        genres: yup.array().required('At least one genre must be specified'),
        height: yup.number().required('Height is required'),
        width: yup.number().required('Width is required'),
        price: yup.string().required('Price is required'),
        description: yup.string()
    });

    imagesSrc: string[] = [];

    paintingId: string;

    constructor(props: any) {
        super(props);
        this.state = {
            painting: null
        };
    }

    componentDidMount(): void {
        this.paintingId = this.props.match.params.id;
        if (this.paintingId) {
            from(paintingService.getPainting(this.paintingId)).subscribe(response => {
                this.setState({painting: response.data.painting});
                this.imagesSrc = [response.data.painting.image.data];
            });
        } else {

        }
    }

    render() {
        return (
            <div className="painting-editor">
                <ImageUploader/>
            </div>
        );
    }
}

export default PaintingEditor;
