import {BaseResponse} from "../base-response.js";


export class UserResponse extends BaseResponse {
    constructor(user, success, errorMessage) {
        super(success, errorMessage);
        this.user = user;
    }
}
