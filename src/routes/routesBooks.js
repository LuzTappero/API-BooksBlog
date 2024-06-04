const express= require ('express');
const booksRouter= express.Router();
const BookController = require('../controllers/booksControllers.js')

booksRouter.get('/', BookController.getAll)
booksRouter.get('/form', BookController.showForm)

booksRouter.get('/id/:id', BookController.getByID)
booksRouter.get('/name/:name', BookController.getByName)
booksRouter.get('/category/:category', BookController.getByCategory)
booksRouter.get('/author/:author', BookController.getByauthor)

booksRouter.post('/submit', BookController.create)
booksRouter.delete('/delete/id/:id', BookController.delete)
booksRouter.patch('/update/id/:id', BookController.update)

module.exports= booksRouter;