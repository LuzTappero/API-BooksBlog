const readDB = require('../../utils/readDB.js')

//__________________________________________________
async function printAllBooks(){
    const books= await readDB();
    try{
        let bookList = books.map(book=>`
        <div class="container__listAll">
            <div class= "book__content">
                <li class="li__description"><h4 class="bookname"> ${book.name}</h4></li>
                <li class="li__description">ID "${book.id}"</li>
                <li class="li__description">${book.author}</li>
                <li class="li__description">${book.category}</li>
            
                <button class="button__delete">
                    <a class="delete-link" href="/books/delete/id">DELETE BOOK</a>
                </button>
                <button class="button__update">
                    <a href="/books/update">UPDATE BOOK</a>
                </button>
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

