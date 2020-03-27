import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      username:
 *        type: string
 *      password:
 *        type: string
 *        format: password
 *      required:
 *        - username
 *        - password
 */
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: 'user'});

userSchema.plugin(normalize);

const User = mongoose.model('User', userSchema);

export default User;