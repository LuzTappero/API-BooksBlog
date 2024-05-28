const express= require ('express');
const app = express();
const booksRouter= express.Router();
const { bookModel } = require("../models/modelBook.js");
const BookController = require('../controllers/booksControllers.js')

//Hacer un try-catch en un middleware porque es un perno hacer un try-catch en cada get.
booksRouter.get('/', BookController.getAll)
booksRouter.get('/form', BookController.showForm)

booksRouter.get('/id/:id', BookController.getByID)
booksRouter.get('/name/:name', BookController.getByName)
booksRouter.get('/category/:category', BookController.getByCategory)
booksRouter.get('/author/:author', BookController.getByauthor)

booksRouter.post('/books/submit', BookController.create)
booksRouter.delete('/id/:id', BookController.delete)
booksRouter.patch('/name/:name', BookController.update)

module.exports= booksRouter;