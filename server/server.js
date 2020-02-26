import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import passport from './config/passport.js';
import {url} from './config/config.js';
import mainRouter from './routes/index.js'

mongoose.connect(url, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(mainRouter);

app.listen(3000, () => console.log('blog server running on port 3000!'));
