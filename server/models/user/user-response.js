import {BaseResponse} from "../base-response.js";

/**
 * @swagger
 * definitions:
 *  UserResponse:
 *    type: object
 *    properties:
 *      user:
 *        $ref: "#/definitions/User"
 *      success:
 *        type: boolean
 *      errorMessage:
 *        type: string
 *      required:
 *        - user
 *        - success
 *        - errorMessage
 */
export class UserResponse extends BaseResponse {
    constructor(user, success, errorMessage) {
        super(success, errorMessage);
        this.user = user;
    }
}
