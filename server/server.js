import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import passport from './config/passport.js';
import {url} from './config/config.js';
import mainRouter from './routes'
mongoose.connect(url);

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.use(mainRouter);
app.use((err, request, response) => {
    response.send({ error: err.message });
});

app.listen(3000, () => console.log('blog server running on port 3000!'));
