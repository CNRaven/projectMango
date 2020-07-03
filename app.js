const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

app.use(cookieParser());
app.use(express.json());

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=> console.log("connected to mongoDB"));


// - /user/userRouter = whatever specified in User.js
const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});