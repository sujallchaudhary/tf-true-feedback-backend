const express = require('express');
const app = express();
const connection = require('./database/connection');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');

connection();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/messages', messageRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on  http://localhost:${process.env.PORT}`);
});