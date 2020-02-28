import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from  'swagger-jsdoc';
import User from './models/user.js';
import passport from './config/passport.js';
import {url} from './config/config.js';
import mainRouter from './routes/index.js'

mongoose.connect(url, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Time to document that Express API you built",
            version: "1.0.0",
            description: "A test project to understand how easy it is to document and Express API"
        },
        host: 'localhost:3000',
        basePath: '/',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header'
            }
        }
    },
    apis: ['./models/user.js', './routes/api/user.js']
};
const specs = swaggerJSDoc(options);
app.get('swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs)
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(mainRouter);

app.listen(3000, () => console.log('blog server running on port 3000!'));
