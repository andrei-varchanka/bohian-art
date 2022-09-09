import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import User from './models/user/user.js';
import passport from './middleware/passport.js';
import {url} from './config/config.js';
import mainRouter from './routes/index.js';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

mongoose.connect(url, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(mainRouter);

app.listen(3000, () => console.log('blog server running on port 3000!'));
