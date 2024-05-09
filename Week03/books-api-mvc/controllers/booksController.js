const Book = require("../models/book.js");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving books");
    }
};

const getBooksById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await Book.getBooksById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erorr retrieving book")
    }
};

const createBook = async (req, res) => {
    const newBook = req.body;
    try {
        const createdBook = await Book.createBook(newBook);
        res.status(201).json(createdBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erorr creating book")
    }
};

const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;
    try {
        const updatedBook = await Book.updateBook(bookId, newBookData);
        if (!updatedbook) {
            return res.status(404).send("Book not found");
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erorr updating book")
    }
};

const deleteBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const success = await Book.deleteBook(bookId);
        if (!success) {
            return res.status(404).send("Book not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Erorr deleting book")
    }
};

module.exports = {
    getAllBooks,
    createBook,
    getBooksById,
    updateBook,
    deleteBook,
};