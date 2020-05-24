import {BaseResponse} from "../base-response.js";

export class AuthUserResponse extends BaseResponse {
    constructor(user, token, success, errorMessage) {
        super(success, errorMessage);
        this.user = user;
        this.token = token;
    }
}
