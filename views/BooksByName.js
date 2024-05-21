const fs= require("fs");
const path = require("path");
const express= require ('express');
const app = express();
app.use(express.json()); //1°
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//2°
app.use(bodyParser.json());//3°
app.use(express.static(path.join(__dirname, 'public')));//4°

//________________________________________________

const dbPath = path.join(__dirname, "../db", "db.json");
let books= [];

fs.readFile(dbPath, 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        return;
    }
    try{
        books = JSON.parse(data);
        console.log('The data has been updated succesfuly', data)
    }catch(parseErr){
        console.error('Error parsing Json:', parseErr)
    }
    
});

function printBookByName(name){
    const filteredBooks = books.filter(b => b.name === name);
    if (filteredBooks.length === 0) {
        //Acá se filtra segun esas condiciones y luego se le aplica .map a cada book obtenido luego del filtro.
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
            </body>
        </html>`;
    }
    let booksHtml= filteredBooks.map(book=>`     
        <div class="book__content">
            <li class="li__description">
                <h4 class="bookname">${book.name}</h4>
            </li>
            <li class="li__description">ID "${book.id}"</li>
            <li class="li__description"> ${book.author}</li>
            <li class="li__description">${book.category}</li>
        </div>`
    ).join('');

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
        <h1 class="main__title">Find your favorite book by Category</h1>
            ${booksHtml}
        </body>
        </html>`;
}
module.exports = printBookByName;