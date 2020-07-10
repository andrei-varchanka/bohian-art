import {BaseResponse} from "../base-response.js";

export class PaintingsParametersResponse extends BaseResponse {
    constructor(minPrice, maxPrice, minWidth, maxWidth, minHeight, maxHeight, success, errorMessage) {
        super(success, errorMessage);
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }
}
