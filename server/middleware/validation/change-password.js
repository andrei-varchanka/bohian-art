import validator from 'validator';
import {isEmpty} from './is-empty.js';
import {BaseResponse} from "../../models/base-response.js";

const validate = data => {
    let errors = [];
    data.password = !isEmpty(data.password) ? data.password : '';
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)');

    if (validator.isEmpty(data.password)) {
        errors.push('Password is required');
    } else if (!validator.matches(data.password, regex)) {
        errors.push('Password must be at least 6 characters, with an uppercase, lowercase, numeric and non-alphanumeric character');
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export const validateChangePassword = (request, response, next) => {
    const {errors, isValid} = validate(request.body);
    if (!isValid) {
        return response.status(400).send(new BaseResponse(false, errors.join('; ')));
    }
    request.errors = errors;
    next();
};

