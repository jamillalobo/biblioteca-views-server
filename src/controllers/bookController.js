const {} = require("express");
const Book = require('../models/book');

async function createBook(req, res) {
    const { id, name, author, description, genre } = req.body;
    try {
        const book = new Book({ id, name, author, description, genre });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getBooks(req, res) {
    try {
        const Books = await Book.find();
        res.status(200).json(Books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function updateBook(req, res) {
    try {
        const { id, name, author, description, genre } = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { id, name, author, description, genre },
            { new: true }
        );
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function deleteBook(req, res) {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ message: 'Book deleted with sucess' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  createBook, 
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};
