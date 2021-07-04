import React from "react";
import {Painting as PaintingModel, User as UserModel} from "../../api";
import * as yup from "yup";
import {paintingService, userService} from "../../services/api";
import {from} from "rxjs";
import ImageUploader from "../shared/ImageUploader";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {genres, roles} from "../../constants";
import {Formik} from "formik";
import storageService from "../../services/storage";
import CheckboxGroup from "../shared/CheckboxGroup";
import '../../styles/painting-editor/painting-editor.scss';

type PaintingEditorProps = { match: any, history: any };
type PaintingEditorState = { painting: PaintingModel, images: File[] };

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
            painting: {
                name: undefined,
                author: undefined,
                genres: [],
                height: undefined,
                width: undefined,
                price: undefined,
                description: undefined,
                image: undefined,
                userId: undefined
            },
            images: []
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

    setImage(image) {
        this.setState({images: image})
    }

    setSelectedGenres(genres: string[]) {
        let painting = this.state.painting;
        painting.genres = genres;
        this.setState({painting});
    }

    submit(values) {
        if (this.paintingId) {
            // paintingDto.paintingId = this.paintingId;
            // this.paintingService.updatePainting(paintingDto).subscribe(response => {
            //     this.router.navigate(['/gallery/' + this.paintingId]);
            // });
        } else {
            from(paintingService.uploadPainting(this.state.images[0], values.name, values.author, storageService.getUser().id,
                values.genres.join('+'), values.height, values.width, values.price, values.description)).subscribe(response => {
                this.props.history.push('/gallery/' + response.data.painting.id);
            });
        }

    }

    render() {
        return (
            <div className="painting-editor">
                <Formik
                    initialValues={this.state.painting}
                    validationSchema={this.validationSchema}
                    enableReinitialize={true}
                    onSubmit={(values) => this.submit(values)}>
                    {
                        formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <ImageUploader onUpload={(image) => this.setImage(image)}/>
                                <div className="field-error">
                                    {this.state.images.length === 0 && formik.touched.image && !this.paintingId ? 'Please upload an image' : ''}
                                </div>
                                <TextField
                                    className="input" fullWidth name="name" label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    className="input" fullWidth name="author" label="Author"
                                    value={formik.values.author}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.author && Boolean(formik.errors.author)}
                                    helperText={formik.touched.author && formik.errors.author}
                                />
                                <div className="checkbox-group-wrapper">
                                    <CheckboxGroup
                                        items={genres}
                                        value={this.state.painting.genres}
                                        onSelectedItemsChange={(genres) => this.setSelectedGenres(genres)}
                                    />
                                    <div className="field-error">
                                        {this.state.painting.genres.length === 0 && formik.touched.genres ? 'Please select at least one genre' : ''}
                                    </div>
                                </div>
                                <TextField
                                    className="input" fullWidth name="height" label="Height"
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.height && Boolean(formik.errors.height)}
                                    helperText={formik.touched.height && formik.errors.height}
                                />
                                <TextField
                                    className="input" fullWidth name="width" label="Width"
                                    value={formik.values.width}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.width && Boolean(formik.errors.width)}
                                    helperText={formik.touched.width && formik.errors.width}
                                />
                                <TextField
                                    className="input" fullWidth name="price" label="Price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <TextField
                                    className="input" fullWidth name="description" label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    multiline={true}
                                    rows={4}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <Button className={'button primary submit'} color="inherit"
                                        variant="contained"
                                        type="submit">
                                    Submit
                                </Button>
                            </form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default PaintingEditor;
