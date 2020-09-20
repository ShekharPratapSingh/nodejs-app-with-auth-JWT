require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./users/user.router')

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(process.env.APP_PORT, () => {
        console.log('Server is running at port:', process.env.APP_PORT);
    
})