import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const Schema = mongoose.Schema;

const paintingSchema = new Schema({
    data: String,
    name: String,
    contentType: String
}, {collection: 'painting'});

paintingSchema.plugin(normalize);

const Painting = mongoose.model('Painting', paintingSchema);

export default Painting;
