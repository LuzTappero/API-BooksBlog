const express= require('express')
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
const printAllBooks = require('../utils/printAllBooks.js');
const printBookById = require('../utils/booksByID.js');
const printBookByCategory = require('../utils/booksByCategory.js');
const printBookByName = require('../utils/BooksByName.js')
const printBookByAuthor = require('../utils/booksByAuthor.js');


class bookModel{
    static getAll= async()=>{
        const books= await printAllBooks();
        return books
    }

    static getByID = async(id)=>{
        const books= await printBookById(id);
        return books
    }

    static getByName = async(name)=>{
        const books= await printBookByName(name);
        return books
    }

    static getByAuthor = async(author)=>{
        const books= await printBookByAuthor(author);
        return books
    }

    static getByCategory = async(category)=>{
        const books= await printBookByCategory(category);
        return books
    }
       
}
module.exports = bookModel;