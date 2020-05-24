
export class BaseResponse {
    constructor(success, errorMessage) {
        this.success = success;
        this.errorMessage = errorMessage;
    }
}
