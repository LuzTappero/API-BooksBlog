const readDB = require('../../utils/readDB.js')

async function printAllBooks(){
    const books= await readDB();
    try{
        let bookList = books.map(book=>`
        <div class="container__listAll"  data-id="${book.id}">
            <div class= "book__content">
                <li class="li__description"><h4 class="bookname">${book.name}</h4></li>
                <li class="li__description">ID: "${book.id}"</li>
                <li class="li__description">Author: ${book.author}</li>
                <li class="li__description">Category:${book.category}</li>
                <button class="button__delete">
                    DELETE BOOK
                </button>
                <button class="button__update">
                    <a>UPDATE BOOK</a>
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
            <header class="header">
                    <nav class="navbar">
                        <li class="navbar__item">
                            <a href="/books/" >SEE ALL BOOKS</a>
                        </li>
                        <li class="navbar__item">
                            <a href='/books/form'>UPLOAD A BOOK</a>
                        </li>
                        <li class="navbar__item">
                            <a href="/user/register">SINGIN</a>
                        </li>
            </nav>
            </header>
                    <h1 class="main__title">All Books</h1>
                    <main>
                        ${bookList}
                    </main>
            </div>
            <footer>FOOTER</footer>
            <script src="/script.js"></script>
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



