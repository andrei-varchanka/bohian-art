import {BaseResponse} from "../base-response.js";

export class PaintingsResponse extends BaseResponse {
    constructor(paintings, count, totalPages, currentPage, success, errorMessage) {
        super(success, errorMessage);
        this.paintings = paintings;
        this.count = count;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
