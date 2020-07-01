import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, required: true},
    phone: {type: String}
}, {collection: 'user'});

userSchema.plugin(normalize);

const User = mongoose.model('User', userSchema);

export default User;
