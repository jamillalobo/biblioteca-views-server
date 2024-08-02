const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    id: String,
    name: String,
    author: String,
    description: String,
    genre: {
        type: String,
        enum: ['romance', 'sci-fi', 'fantasy', 'thriller', 'non-fiction'],
        required: true
    }
});

const Book = mongoose.model('Book', livroSchema);

module.exports = Book;
