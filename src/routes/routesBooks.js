const express= require ('express');
const app = express();
const booksRouter= express.Router();
const { bookModel } = require("../models/modelBook.js");
const BookController = require('../controllers/booksControllers.js')
const path = require("path");
app.use(express.static(path.join(__dirname,'public','css')));

booksRouter.get('/', BookController.getAll)
booksRouter.get('/form', BookController.showForm)

booksRouter.get('/id/:id', BookController.getByID)
booksRouter.get('/name/:name', BookController.getByName)
booksRouter.get('/category/:category', BookController.getByCategory)
booksRouter.get('/author/:author', BookController.getByauthor)

booksRouter.post('/submit', BookController.create)
booksRouter.delete('/id/:id', BookController.delete)
booksRouter.patch('/id/:id', BookController.update)

module.exports= booksRouter;