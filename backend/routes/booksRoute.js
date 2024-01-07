const express = require('express')
const Book = require('../models/bookModel');

const router = express.Router()


// save a new book
router.post('/', async (req, res) => {
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
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

router.get('/', async (req, res) => {
    
    try {

        const books = await Book.find({})

        res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (err) {
        console.error(err)
        res.status(500).send({ error: 'Internal Server Error' })
    }

})

// get one book data by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)
        res.status(200).json(book)

    } catch(err) {
        console.error(`Error: ${err}`)
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

router.put('/:id', async (req, res) => {
    
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

        if(result === null) {
            return res.status(404).send({error: 'Book not found!'})
        } else {
            res.status(200).json(result);
        }

    } catch (err) {
        console.error('Error:', err.message)
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

// delete book 
router.delete('/:id', async (req, res) => {

    const { id } = req.params

    try {

        const result = await Book.findByIdAndDelete(id)
        
        if(result === null){
            return res.status(404).json({ error: 'No Book found' })
        } 

        res.status(200).json(result)

    } catch(err) {
        console.log('Error', err.message)
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

module.exports = router
