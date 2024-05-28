const modelBook = require('../models/modelBook.js')
const { get } = require('../routes/routesBooks.js')
const path = require("path");
const writeBookInJson = require('../utils/writeBook.js');
const express= require('express')
const app= express()
const bodyParser = require('body-parser');
const bookModel = require('../models/modelBook.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

class BookController{
    static async getAll(req,res){
        const getAllBooks= await modelBook.getAll()
        res.send(getAllBooks)
    }

    static async getByID(req,res){
        const id = req.params.id;
        const getById= await modelBook.getByID(id)
        res.send(getById)
    }

    static async getByName(req,res){
        const name = req.params.name;
        const getByName = await modelBook.getByName(name)
        res.send(getByName)
    }

    static async getByCategory(req,res){
        const category= req.params.category;
        const getByCategory = await modelBook.getByCategory(category)
        res.send(getByCategory)
    }

    static async getByauthor(req,res){
        const author = req.params.author;
        const getByAuthor = await modelBook.getByAuthor(author)
        res.send(getByAuthor)
    }
    static async showForm(req,res){
        await res.sendFile(path.join(__dirname, '../../public', 'form.html'));
    }
    
    static async create(req,res){
        try {
            if(!req.body || !req.body.name || !req.body.author || !req.body.category){
                throw new Error('Invalid request body');
            }
            const newBook = await writeBookInJson(req.body);
            return res.redirect('/books')
        }catch(error){
            console.error('Error creating book:', error);
            return res.status(500).json({ error: 'Error creating book' });
        }
    }
    //Intentar pasar esto a un modeloCreate.
    static async delete (req,res){
        const id = req.params.id;
        const result= await bookModel.delete(id)
            if (result === false){return res.status(404).send({message: "book not found to delete"})}
            return res.send({message: 'Book deleted'})
    }
    static async update(req,res){
        const id = req.params.id;
        const updatedBook= await bookModel.update(id)
        return res.send(updatedBook)
    }
}


module.exports = BookController;