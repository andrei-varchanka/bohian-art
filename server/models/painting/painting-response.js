import {BaseResponse} from "../base-response.js";

export class PaintingResponse extends BaseResponse {
    constructor(painting, success, errorMessage) {
        super(success, errorMessage);
        this.painting = painting;
    }
}
