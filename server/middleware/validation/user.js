import validator from 'validator';
import {isEmpty} from './is-empty.js';
import {UserResponse} from "../../models/user/user-response.js";

const validate = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isLength(data.email, { min: 4, max: 30 })) {
        errors.email = 'Email must be between 5 and 30 characters';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password mast be at least 6 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export const validateUser = (request, response, next) => {

    const { errors, isValid } = validate(request.body);
    if (!isValid) {
        return response.status(400).send(new UserResponse(null, false, errors));
    }

    request.errors = errors;

    next();
};

