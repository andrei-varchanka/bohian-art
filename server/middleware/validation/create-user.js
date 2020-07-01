import validator from 'validator';
import {isEmpty} from './is-empty.js';
import {UserResponse} from "../../models/user/user-response.js";

const validate = data => {
    let errors = [];

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isLength(data.email, { min: 4, max: 30 })) {
        errors.push('Email must be between 5 and 30 characters');
    }

    if (validator.isEmpty(data.email)) {
        errors.push('Email is required');
    }

    if (validator.isEmpty(data.password)) {
        errors.push('Password is required');
    }

    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)');

    if (!validator.matches(data.password, regex)) {
        errors.push('Password must be at least 6 characters, with an uppercase, lowercase, numeric and non-alphanumeric character');
    }

    if (data.role !== 'Admin' && data.role !== 'Artist') {
        errors.push('Wrong role')
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export const validateUser = (request, response, next) => {

    const { errors, isValid } = validate(request.body);
    if (!isValid) {
        return response.status(400).send(new UserResponse(null, false, errors.join('; ')));
    }

    request.errors = errors;

    next();
};

