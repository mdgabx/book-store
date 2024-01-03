const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT

// HTTP route
app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Hello World')
});

// mongo connect
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`DB connected successfully`)

        app.listen(PORT, () => {
            console.log(`Listening to PORT ${PORT}`)
        })
        
    })
    .catch((err) => {
        console.log(`Error: ${err}`)
    })