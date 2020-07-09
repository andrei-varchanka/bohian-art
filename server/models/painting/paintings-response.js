import {BaseResponse} from "../base-response.js";

export class PaintingsResponse extends BaseResponse {
    constructor(paintings, totalPages, currentPage, success, errorMessage) {
        super(success, errorMessage);
        this.paintings = paintings;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
