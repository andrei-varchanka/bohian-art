import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements OnInit {

  @Input()
  multiUpload: boolean;

  @Input()
  fileSrcs: string[];

  files: File[] = [];

  extensionsMappings: { [key: string]: string } = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
  };

  maxFileSize = 25000000;

  errors: string;

  @Output()
  public onUpload: EventEmitter<File[]> = new EventEmitter<File[]>();

  @Output()
  public onDelete: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (!this.fileSrcs || !this.fileSrcs[0]) {
      this.fileSrcs = [];
    }
  }

  onFileSelected(files) {
    let file = files[0];
    this.errors = '';
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
      this.errors = this.errors.concat('The uploaded file size exceeds maximum value of 25Mb. ');
      return false;
    }
  }

  checkFileTypeValid(file: File): boolean {
    let fileType = file.type;
    if (Object.keys(this.extensionsMappings).some((key) => this.extensionsMappings[key] === fileType)) {
      return true;
    } else {
      this.errors = this.errors.concat('Extension of the uploaded document does not meet the requirements. ' +
        'You can attach file of the following formats: png, jpeg. ');
      return false;
    }
  }

  private addFile(file: File): void {
    const reader = new FileReader();
    this.multiUpload ? this.files.push(file) : this.files = [file];
    reader.onload = e => {
      this.multiUpload ? this.fileSrcs.push(reader.result.toString()) : this.fileSrcs = [reader.result.toString()];
      this.onUpload.emit(this.files);
    };
    reader.readAsDataURL(file);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.fileSrcs.splice(index, 1);
    this.onDelete.emit();
  }
}
