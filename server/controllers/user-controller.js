import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user/user.js';
import {AuthUserResponse} from "../models/user/auth-user-response.js";
import {UserResponse} from "../models/user/user-response.js";

const saltRounds = 10;
const existingUserError = "Such username has already been used";
const usernameError = "Invalid username";
const passwordError = "Invalid password";

export const login = async (request, response, next) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return response.status(401).send(new AuthUserResponse(null, false, usernameError));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return response.status(401).send(new AuthUserResponse(null, false, passwordError));
    }
    const payload = { username: user.username, password: user.password };
    const token = jwt.sign(payload, 'secret', {expiresIn: 86400});
    response.send(new AuthUserResponse('Bearer' + token, true, null));
};

export const createUser = async (request, response, next) => {
    const { username, password } = request.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return response.status(400).send(new UserResponse(null, false, existingUserError));
    }
    const user = new User({username, password});
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await User.create(user);
    response.send(new UserResponse(newUser, true, null));
};

export const updateUser = async (req, res, next) => {
    const userId = req.params["userId"];
    const updatedObj = req.body;
    if (updatedObj.password) {
        const salt = await bcrypt.genSalt(saltRounds);
        updatedObj.password = await bcrypt.hash(updatedObj.password, salt);
    }
    User.findByIdAndUpdate(userId, req.body, {new: true}, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.json(user);
        }
    });
};

export const getById = (req, res, next) => {
    User.findOne({_id: req.params['userId']}, (err, user) => {
        if (err) {
            next(err);
        } else {
            res.json(user);
        }
    });
};

export const deleteUser = (req, res, next) => {
    User.remove({_id: req.params['userId']}, (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
};

export const getAllUsers = (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            next(err);
        } else {
            res.json(users);
        }
    });
};
