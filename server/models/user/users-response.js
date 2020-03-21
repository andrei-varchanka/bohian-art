import {BaseResponse} from "../base-response.js";

/**
 * @swagger
 * definitions:
 *  UsersResponse:
 *    type: object
 *    properties:
 *      users:
 *        type: array
 *        items:
 *          $ref: "#/definitions/User"
 *      success:
 *        type: boolean
 *      errorMessage:
 *        type: string
 *      required:
 *        - users
 *        - success
 *        - errorMessage
 */
export class UsersResponse extends BaseResponse {
    constructor(users, success, errorMessage) {
        super(success, errorMessage);
        this.users = users;
    }
}
