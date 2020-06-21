import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const Schema = mongoose.Schema;

const File = new Schema({
        data: String,
        name: String,
        contentType: String
    });

const paintingSchema = new Schema({
    image: File,
    name: String,
    author: String,
    userId: String,
    genres: [String],
    height: Number,
    width: Number,
    price: Number,
    description: String
}, {collection: 'painting'});

paintingSchema.plugin(normalize);

const Painting = mongoose.model('Painting', paintingSchema);

export default Painting;
