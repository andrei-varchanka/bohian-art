import validator from 'validator';
import {isEmpty} from './is-empty.js';

const validate = data => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isLength(data.username, { min: 4, max: 30 })) {
        errors.username = 'Username must be between 5 and 30 characters';
    }

    if (validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
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

        return response.status(400).send({
            error: errors
        });
    }

    request.errors = errors;

    next();
};

