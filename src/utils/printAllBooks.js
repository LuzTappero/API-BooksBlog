const express= require ('express');
const app = express();
const path = require("path");
const readBookFromJson = require('../utils/readbooks.js');

//__________________________________________________
async function printAllBooks(){
    try{
        let books= await readBookFromJson();
        let bookList = books.map(book=>`
        <div class="container__listAll">
            <div class= "book__content">
                <li class="li__description"><h4 class="bookname"> ${book.name}</h4></li>
                <li class="li__description">ID "${book.id}"</li>
                <li class="li__description">${book.author}</li>
                <li class="li__description">${book.category}</li>
                </div>
            </div>`).join('');
            

        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
    <div class="wrapper">
       <header class="header">HEADER
       </header>
            <h1 class="main__title">All Books</h1>
                ${bookList}
    </div>
    <footer>FOOTER</footer>
    </body>
    
    </html>`;
    }catch (err){
        console.error('Failed to read all books:', err);
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
        <div class="wrapper">
            <header class="header">HEADER</header>
                <h1 class="main__title">Error loading books</h1>
        
        </div>
        <footer>FOOTER</footer>
        </body>
        </html>`;
    };
};
module.exports = printAllBooks;

