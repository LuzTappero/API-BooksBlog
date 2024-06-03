const express= require('express')
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
const printAllBooks = require('../views/JS/printAllBooks.js');
const printBookById = require('../views/JS/booksByID.js');
const printBookByCategory = require('../views/JS/booksByCategory.js');
const printBookByName = require('../views/JS/BooksByName.js')
const printBookByAuthor = require('../views/JS/booksByAuthor.js');
const readBookFromJson = require('../utils/readbooks.js');
const writeBookInJson = require('../utils/writeBook.js');


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
    static async createBook(dataBook){
        try{
            const books= await readBookFromJson();
            const newBook= {
                id: books.length + 1,
                name: dataBook.name,
                author: dataBook.author,
                category: dataBook.category
            };
            books.push(newBook);
            await writeBookInJson(books);
            return newBook;
        }
        catch(error){
            console.error('Error signing in:', error);
            }
    }
    static async delete (id){
        const books= await readBookFromJson()
        const bookIndex= books.findIndex(book=> book.id === parseInt(id))
        if(bookIndex === -1) return false;
        books.splice(bookIndex, 1)
        await writeBookInJson(books);
        return true;
    }
    static async update (id, bookData){
        const books= await readBookFromJson();
        const bookIndex= books.findIndex(book=> book.id === parseInt(id))
        if(bookIndex === -1) return false;
        books[bookIndex]={
            ...books[bookIndex],
            ...bookData
        }
        await writeBookInJson(books);
        return books[bookIndex]
    }
}


module.exports = bookModel;