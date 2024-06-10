const path = require("path");
const express= require ('express');
const app = express();

const readDB = require('../../utils/readDB.js')

async function printBookById(id){
try{
    const books = await readDB();
    const book = books.find(b => b.id ===(id));
    console.log('Luego de find id me devuelve el siguiente elemento', book);
    if (!book){
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
        <header class="header">HEADER </header>
            <h1 class="main__title">Book not found</h1>
        </div>
        <footer>FOOTER</footer>
        </body>
        </html>`;
    }
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
            <header class="header">HEADER </header>
            <h1 class="main__title">Find your favorite book by ID</h1>
            <div class="book__content" data-id="${book.id}">
                <li class="li__description">
                    <h4 class="bookname">${book.name}</h4>
                </li>
                <li class="li__description">ID "${book.id}"</li>
                <li class="li__description">Author: ${book.author}</li>
                <li class="li__description">Category: ${book.category}</li>
                 <button class="button__delete">
                    DELETE BOOK
                </button>
                <button class="button__update">
                    <a>UPDATE BOOK</a>
                </button>
            </div>
        </div>
        <footer>FOOTER</footer>
        <script src="/script.js"></script>
        </body>
        </html>`;
    }
    catch(err){
        console.error('Failed to read books by author:', err);
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

module.exports = printBookById;

