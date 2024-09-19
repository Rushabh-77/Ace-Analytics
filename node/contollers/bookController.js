const Book = require('../models/Book.js');

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
};
