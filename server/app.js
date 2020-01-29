import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './model/user.js';

const app = express();
const url = 'mongodb://localhost:27017/bohian-art';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
        User.find({username : req.body.username, password : req.body.password}, function(err, user) {
            if(err) throw err;
            if(user.length === 1){
                return res.status(200).json({
                    status: 'success',
                    data: user[0]
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }

        });
    }, error => {
        console.log('Database could not connected: ' + error)
    });
});

app.listen(3000, () => console.log('blog server running on port 3000!'));
