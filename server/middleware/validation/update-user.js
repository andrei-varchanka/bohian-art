import validator from 'validator';
import {isEmpty} from './is-empty.js';
import {UserResponse} from "../../models/user/user-response.js";

const validate = data => {
    let errors = [];

    data.email = !isEmpty(data.email) ? data.email : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.role = !isEmpty(data.role) ? data.role : '';

    if (validator.isEmpty(data.email)) {
        errors.push('Email is required');
    } else if (!validator.isLength(data.email, {min: 5, max: 30})) {
        errors.push('Email must be between 5 and 30 characters');
    }

    if (validator.isEmpty(data.firstName)) {
        errors.push('First name is required');
    } else if (!validator.isLength(data.firstName, {min: 2, max: 30})) {
        errors.push('First name be between 2 and 30 characters');
    }

    if (validator.isEmpty(data.lastName)) {
        errors.push('Last name is required');
    } else if (!validator.isLength(data.lastName, {min: 2, max: 30})) {
        errors.push('Last name must be between 2 and 30 characters');
    }

    if (validator.isEmpty(data.role)) {
        errors.push('Role is required');
    } else if (data.role !== 'Admin' && data.role !== 'Artist') {
        errors.push('Wrong role')
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export const validateUpdateUser = (request, response, next) => {
    const {errors, isValid} = validate(request.body);
    if (!isValid) {
        return response.status(400).send(new UserResponse(null, false, errors.join('; ')));
    }
    request.errors = errors;
    next();
};

