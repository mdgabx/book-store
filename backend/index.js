const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HTTP route
app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Hello World')
});

// save a new book
app.post('/book', async (req, res) => {
    const { title, author, publishYear } =  req.body
    
    try {

        if(!title || !author || !publishYear) {
            return res.status(400).send({ message: 'Required fields' })
        } else {

           const newBook = {
            title,
            author,
            publishYear
           }

           const book = await Book.create(newBook)

           res.status(201).send(book)
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }
})

app.get('/book', async (req, res) => {
    
    try {

        const books = await Book.find({})

        res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err.message })
    }

})

// get one book data by id
app.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)
        res.status(200).json(book)

    } catch(err) {
        console.error(`Error: ${err}`)
        res.status(500).send({ error: err.message })
    }
})

app.put('/book/:id', async (req, res) => {
    
    const { title, author, publishYear } = req.body 
    const { id } = req.params
    
    if(!title || !author || !publishYear) {
        return res.status(400).send({ error: 'All Fields are required(s)' })
    } 

    try {

        const result = await Book.findByIdAndUpdate(id, {
            title,
            author,
            publishYear
        }, {
            new: true
        })

        res.status(200).json(result);

    } catch (err) {
        console.error('Error:', err.message)
        res.status(500).send({ error: err.message })
    }

})


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