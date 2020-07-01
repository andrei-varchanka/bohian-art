import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user/user.js';
import {AuthUserResponse} from "../models/user/auth-user-response.js";
import {UserResponse} from "../models/user/user-response.js";
import {UsersResponse} from "../models/user/users-response.js";
import {BaseResponse} from "../models/base-response.js";

const saltRounds = 10;
const existingUserError = "Such email has already been used";
const emailError = "Invalid email";
const passwordError = "Invalid password";

export const login = async (request, response, next) => {
    const {email, password} = request.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return response.status(401).send(new AuthUserResponse(null, null, false, emailError));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return response.status(401).send(new AuthUserResponse(null, null, false, passwordError));
    }
    const payload = {email: user.email, password: user.password};
    const token = jwt.sign(payload, 'secret', {expiresIn: 86400});
    response.send(new AuthUserResponse(user, 'Bearer ' + token, true, null));
};

export const createUser = async (request, response, next) => {
    const {email, password, firstName, lastName, role, phone} = request.body;
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        return response.status(400).send(new UserResponse(null, false, existingUserError));
    }
    const user = new User({email, password, firstName, lastName, role, phone});
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await User.create(user);
    const payload = {email: user.email, password: user.password};
    const token = jwt.sign(payload, 'secret', {expiresIn: 86400});
    response.send(new AuthUserResponse(newUser, 'Bearer ' + token, true, null));
};

export const updateUser = async (req, res, next) => {
    const userId = req.params["userId"];
    User.findByIdAndUpdate(userId, {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        phone: req.body.phone,
    }, {new: true}, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.json(new UserResponse(user, true, null));
        }
    });
};

export const changePassword = async (req, res, next) => {
    const userId = req.params["userId"];
    const salt = await bcrypt.genSalt(saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    User.findByIdAndUpdate(userId, {password: req.body.password}, {new: true}, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.json(new UserResponse(user, true, null));
        }
    });
};

export const getUserById = (req, res, next) => {
    User.findOne({_id: req.params['userId']}, (err, user) => {
        if (err) {
            next(err);
        } else {
            res.json(new UserResponse(user, true, null));
        }
    });
};

export const deleteUser = (req, res, next) => {
    User.remove({_id: req.params['userId']}, (err, result) => {
        if (err) return console.log(err);
        res.json(new BaseResponse(true, null));
    });
};

export const getAllUsers = (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            next(err);
        } else {
            res.json(new UsersResponse(users, true, null));
        }
    });
};
