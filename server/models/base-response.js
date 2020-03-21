/**
 * @swagger
 * definitions:
 *  BaseResponse:
 *    type: object
 *    properties:
 *      success:
 *        type: boolean
 *      errorMessage:
 *        type: string
 *      required:
 *        - success
 *        - errorMessage
 */
export class BaseResponse {
    constructor(success, errorMessage) {
        this.success = success;
        this.errorMessage = errorMessage;
    }
}
