const path = require("path");
const express= require ('express');
const app = express();

const readBookFromJson = require('../utils/readbooks.js')

async function printBookById(id){
try{
    const books = await readBookFromJson();
    const book = books.find(b => b.id === parseInt(id));
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
        
            <h1 class="main__title">Book not found</h1>
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
        <header class="header">HEADER </header>

        <h1 class="main__title">Find your favorite book by ID</h1>
        <div class="book__content">
            <li class="li__description">
                <h4 class="bookname">${book.name}</h4>
            </li>
            <li class="li__description">ID "${book.id}"</li>
            <li class="li__description">Author: ${book.author}</li>
            <li class="li__description">Category: ${book.category}</li>
        </div>
        <footer>FOOTER</footer>
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
        <header class="header">HEADER</header>
            <h1 class="main__title">Error loading books</h1>
        <footer>FOOTER</footer>
        </body>
        </html>`;
    };
};

module.exports = printBookById;

