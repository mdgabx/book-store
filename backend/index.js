const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/booksRoute')
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling CORS policy

app.use(cors({
    origin: 'https://localhost:5151',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

// HTTP route
app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Hello World')
});

app.use('/book', booksRoutes)

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
        console.log("Error",`Error: ${err}`)
    })