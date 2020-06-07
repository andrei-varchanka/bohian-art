import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paintingSchema = new Schema({
    data: Buffer,
    name: String,
    contentType: String
}, {collection: 'painting'});

const Painting = mongoose.model('Painting', paintingSchema);

export default Painting;
