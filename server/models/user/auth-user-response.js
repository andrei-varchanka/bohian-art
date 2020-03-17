import {BaseResponse} from "../base-response.js";

/**
 * @swagger
 * definitions:
 *  AuthUserResponse:
 *    type: object
 *    properties:
 *      token:
 *        type: string
 *      success:
 *        type: boolean
 *      errorMessage:
 *        type: string
 *      required:
 *        - token
 *        - success
 *        - errorMessage
 */
export class AuthUserResponse extends BaseResponse {
    constructor(token, success, errorMessage) {
        super(success, errorMessage);
        this.token = token;
    }
}
