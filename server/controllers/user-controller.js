import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../models/user.js';

const usernameError = "Invalid username";
const passwordError = "Invalid password";

export const login = async (request, response, next) => {

    const { username, password } = request.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        return response.status(401).send({
            error: {
                username: usernameError,
                password: null
            }
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return response.status(401).send({
            error: {
                username: null,
                password: passwordError
            }
        });
    }

    const payload = { username: user.username, password: user.password };
    const token = jwt.sign(payload, 'secret', {expiresIn: 86400});

    response.send({
        success: true,
        token: 'Bearer ' + token
    });
};
