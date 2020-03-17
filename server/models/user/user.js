import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const Schema = mongoose.Schema;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *            format: password
 */
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: 'user'});

userSchema.plugin(normalize);

const User = mongoose.model('User', userSchema);

export default User;
