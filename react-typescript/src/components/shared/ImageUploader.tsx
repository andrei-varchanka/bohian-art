import React, {RefObject} from 'react';
import '../../styles/shared/image-uploader.scss';
import DeleteIcon from '@material-ui/icons/Delete';

type ImageUploaderProps = { multiUpload?: boolean, oldFileSrcs?: string[], onUpload?: Function, onDelete?: Function };
type ImageUploaderState = { fileSrcs: string[], errors: string };

class ImageUploader extends React.Component<ImageUploaderProps, ImageUploaderState> {

    files: File[] = [];

    extensionsMappings: { [key: string]: string } = {
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.png': 'image/png'
    };

    maxFileSize = 25000000;

    inputRef: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            fileSrcs: this.props.oldFileSrcs || [],
            errors: ''
        };
    }

    onFileSelected(files) {
        let file = files[0];
        console.log(file);
        this.setState({errors: ''});
        if (this.validateFile(file)) {
            this.addFile(file);
        }
    }

    validateFile(file: File): boolean {
        return this.checkFileSizeValid(file) && this.checkFileTypeValid(file);
    }

    checkFileSizeValid(file: File): boolean {
        if (file.size < this.maxFileSize) {
            return true;
        } else {
            this.setState({errors: this.state.errors.concat('The uploaded file size exceeds maximum value of 25Mb. ')});
            return false;
        }
    }

    checkFileTypeValid(file: File): boolean {
        let fileType = file.type;
        if (Object.keys(this.extensionsMappings).some((key) => this.extensionsMappings[key] === fileType)) {
            return true;
        } else {
            this.setState({errors: this.state.errors.concat('Extension of the uploaded document does not meet the requirements. ' +
                    'You can attach file of the following formats: png, jpeg. ')});
            return false;
        }
    }

    private addFile(file: File): void {
        const reader = new FileReader();
        this.props.multiUpload ? this.files.push(file) : this.files = [file];
        reader.onload = e => {
            let fileSrcs = this.state.fileSrcs;
            if (this.props.multiUpload) {
                fileSrcs.push(reader.result.toString());
            } else {
                fileSrcs = [reader.result.toString()];
            }
            this.setState({fileSrcs});
            if (this.props.onUpload) {
                this.props.onUpload(this.files);
            }
        };
        reader.readAsDataURL(file);
    }

    onDropAreaClick() {
        this.inputRef?.current.click();
    }

    deleteAttachment(index) {
        this.files.splice(index, 1);
        let fileSrcs = this.state.fileSrcs;
        fileSrcs.splice(index, 1);
        this.setState({fileSrcs});
        if (this.props.onDelete) {
            this.props.onDelete();
        }
    }

    render() {
        return (
            <div className="image-uploader" onClick={() => this.onDropAreaClick()}>
                <div className="image-uploader__drop-area">
                    <span className="image-uploader__drop-area_hint">Click to select image or drop it here!</span>
                    <input hidden type="file" ref={this.inputRef}
                           onChange={(event) => this.onFileSelected(event.target.files)}/>
                </div>
                {
                    this.state.fileSrcs.map((file, i) => {
                        return <div className="image-uploader__file">
                            <img src={file} height="150px"/>
                            <DeleteIcon className="delete" onClick={() => this.deleteAttachment(i)}/>
                        </div>
                    })
                }
                {
                    this.state.errors &&
                    <div className="image-uploader__hint">
                        {this.state.errors}
                    </div>
                }
            </div>
        );
    }
}

export default ImageUploader;
