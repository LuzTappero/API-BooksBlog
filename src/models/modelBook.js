const express= require('express')
const printAllBooks = require('../views/JS/printAllBooks.js');
const printBookById = require('../views/JS/booksByID.js');
const printBookByCategory = require('../views/JS/booksByCategory.js');
const printBookByName = require('../views/JS/BooksByName.js')
const printBookByAuthor = require('../views/JS/booksByAuthor.js');
const readDB = require('../utils/readDB.js');
const writeInDB = require('../utils/writeInDB.js');
const { v4: uuidv4 } = require('uuid');

class bookModel{
    static getAll= async()=>{
        const books= await printAllBooks();
        return books
    }
    static getByID = async(id)=>{
        try{
            const books = await readDB();
            const bookId = books.find(b =>b.id ===(id));
            if (!bookId){
                return false;
            }
            return bookId;
        }
        catch(error){
            console.error('Error finding book by id')

        }
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
            const books= await readDB();
            const newBook= {
                id: uuidv4(),
                name: dataBook.name,
                author: dataBook.author,
                category: dataBook.category
            };
            books.push(newBook);
            await writeInDB(books);
            return newBook;
        }
        catch(error){
            console.error('Error signing in:', error);
            }
    }
    static async delete (id){
        const books= await readDB()
        const bookIndex= books.findIndex(book=> book.id === (id))
        if(bookIndex === -1) return false;
        books.splice(bookIndex, 1)
        await writeInDB(books);
        return true;
    }
    static async update (id, bookData){
        const books= await readDB();
        const bookIndex= books.findIndex(book=> book.id === (id))
        if(bookIndex === -1) return false;
        books[bookIndex]={
            ...books[bookIndex],
            ...bookData
        }
        await writeInDB(books);
        return books[bookIndex]
    }
}
module.exports = bookModel;