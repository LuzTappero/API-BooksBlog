const fs= require("fs");
const express= require ('express');
const app = express();
const path = require("path");
app.use(express.json()); //1°
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//2°
app.use(bodyParser.json());//3°
app.use(express.static(path.join(__dirname, 'public')));//4°

//__________________________________________________

const dbPath = path.join(__dirname, "../db", "db.json");
let books= [];

fs.readFile(dbPath, 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        return;
    }
    try{
        books = JSON.parse(data);
        console.log('The data has been updated succesfuly')
    }catch(parseErr){
        console.error('Error parsing Json:', parseErr)
    }
});

function printAllBooks(){
    console.log('Generating HTML for all books:', books);
    let bookHtml = books.map(book=>`
        <div class="book__content">
            <li class="li__description"><h4 class="bookname"> ${book.name}</h4></li>
            <li class="li__description">ID "${book.id}"</li>
            <li class="li__description">Author: ${book.author}</li>
            <li class="li__description">Category: ${book.category}</li>
        </div>
    `).join('');

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
            ${bookHtml}
        </div>
    </ul>
    </body>
    <footer>FOOTER</footer>
    </html>`;
}

module.exports = printAllBooks;

