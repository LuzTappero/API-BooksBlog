const readDB = require('../../utils/readDB.js')

async function printBookByAuthor(author){
try{
    const books= await readDB();
    const filteredBooks = books.filter(b => b.author === author);
    console.log('luego de filtrar obtiene el siguiente elemento:', filteredBooks);
    if (filteredBooks.length === 0) {
        return`<!DOCTYPE html>
        // <html lang="en">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Document</title>
        //     <link rel="stylesheet" href="/styles.css">
        // </head>
        // <div class="wrapper">
        //     <body>
        //     <header class="header">HEADER</header>
        //         <h1 class="main__title">Book not found</h1>
        //     <footer>FOOTER</footer>
        //     </body>
        // </div>
        // </html>`;
    }
    let booksHtml= filteredBooks.map(book=>`     
        <div class="book__content" data-author="${book.author}">
            <li class="li__description">
                <h4 class="bookname">${book.name}</h4>
            </li>
            <li class="li__description">ID "${book.id}"</li>
            <li class="li__description"> ${book.author}</li>
            <li class="li__description">${book.category}</li>
             <button class="button__delete">
                    DELETE BOOK
                </button>
                <button class="button__update">
                    <a>UPDATE BOOK</a>
                </button>
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
            <header class="header">HEADER</header>
                <h1 class="main__title">Find your favorite book by Author</h1>
                ${booksHtml}
        </div>
        <footer>FOOTER</footer>
        <script src="/script.js"></script>
        </body>
        </html>`;
    }
    catch(err){
        console.error('Failed to read books by author:', err)
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

module.exports = printBookByAuthor;