import {BaseResponse} from "../base-response.js";

export class PaintingsResponse extends BaseResponse {
    constructor(paintings, success, errorMessage) {
        super(success, errorMessage);
        this.paintings = paintings;
    }
}
