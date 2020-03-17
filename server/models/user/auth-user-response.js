import {BaseResponse} from "../base-response.js";

export class AuthUserResponse extends BaseResponse {
    constructor(token, success, errorMessage) {
        super(success, errorMessage);
        this.token = token;
    }
}
