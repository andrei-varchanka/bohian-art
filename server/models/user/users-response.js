import {BaseResponse} from "../base-response.js";

export class UsersResponse extends BaseResponse {
    constructor(users, success, errorMessage) {
        super(success, errorMessage);
        this.users = users;
    }
}
