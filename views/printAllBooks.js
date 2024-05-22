const fs= require("fs");
const express= require ('express');
const app = express();
const path = require("path");
const readBookFromJson = require('./readbooks.js');

//__________________________________________________
async function printAllBooks(){
    try{
        let books= await readBookFromJson();
        let bookList = books.map(book=>`
        <div class="container">
            <li class="li__description"><h4 class="bookname"> ${book.name}</h4></li>
            <li class="li__description">ID "${book.id}"</li>
            <li class="li__description">${book.author}</li>
            <li class="li__description">${book.category}</li>
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
       <header class="header">HEADER</header>
        <h1 class="main__title">All Books</h1>
        <div class"book_separator">
            ${bookList}
        </div>
    </ul>
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
            <h1 class="main__title">Error loading books</h1>
        </body>
        <footer>FOOTER</footer>
        </html>`;
    };
};
module.exports = printAllBooks;

