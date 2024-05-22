const fs= require("fs");
const path = require("path");
const express= require ('express');
const app = express();
//__________________________________________________________________
app.use(express.json()); //1°
const bodyParser = require('body-parser');//npm install body-parser
app.use(bodyParser.urlencoded({ extended: false }));//2°
app.use(bodyParser.json());//3°
app.use(express.static(path.join(__dirname, 'public')));//4°
//__________________________________________________________________

const printAllBooks = require('./views/printAllBooks.js');
const printBookById = require('./views/booksByID.js');
const printBookByCategory = require('./views/booksByCategory.js');
const printBookByName = require('./views/BooksByName.js');
const printBookByAuthor = require('./views/booksByAuthor.js');
const readBookFromJson = require('./views/readbooks.js');
//____________________________________________________________________
/*GET*/
app.get('/books', async (req,res)=>{
    const books= await printAllBooks();
    res.send(books)
})
/*GET BY ID*/
app.get('/books/id/:id',async (req, res)=>{
    const bookId = req.params.id;//req.params.name: compara con los parámetros de la solicitud HTTP
    const html = await printBookById(bookId)
    res.send(html);
});
/*GET BY NAME*/
app.get('/books/name/:name', async (req, res)=>{
    const bookName= req.params.name; 
    const html= await printBookByName(bookName);
    res.send(html);
});

/*GET BY CATEGORY*/
app.get('/books/category/:category', async (req, res)=>{
    const bookCategory = req.params.category;
    const html= await printBookByCategory(bookCategory)
    res.send(html);
});
/*GET BY AUTHOR*/
app.get('/books/author/:author', async(req, res)=>{
    const bookAuthor= req.params.author; 
    const html= await printBookByAuthor(bookAuthor);
    res.send(html);
})

/*GET FORM to upload a book*/
app.get('/books/create', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
})

//__________________________POST_____________________________
//readFile

const dbPath = path.join(__dirname, "./db", "db.json");

//method POST from the form.
app.post('/submit', async (req,res)=>{
    let books= await readBookFromJson()
    const newBook = {
        id: books.length + 1, 
        name: req.body.name,
        author: req.body.author, 
        category: req.body.category
    };
//Escribir un nuevo libro
    fs.writeFile(dbPath, JSON.stringify([...books, newBook], null,2), (err)=>{
    if (err){console.error(err);
        res.status(500).send('Error saving data');
        return;}
    books.push(newBook);
    res.redirect('/books')
    window.location.reload();
    });
});


//Explicaciones: En Express, el middleware body-parser se utiliza para analizar los datos del cuerpo de las solicitudes entrantes en el servidor. Esto es especialmente útil para procesar datos enviados a través de formularios HTML o para manejar solicitudes AJAX que envían datos en formato JSON.

//app.use(bodyParser.urlencoded({ extended: false }));esta línea configura el middleware body-parser para analizar los datos de los formularios codificados en la URL (application/x-www-form-urlencoded).El objeto de configuración { extended: false } indica que el análisis no permite objetos anidados en los datos del formulario. Si tienes datos muy complejos o anidados en tus formularios, puedes cambiarlo a { extended: true }, pero en la mayoría de los casos, false es suficiente.Esto significa que cuando se envia un formulario HTML con el método POST, los datos del formulario se analizarán y estarán disponibles en req.body como un objeto JavaScript.

//app.use(bodyParser.json()): Esta línea configura el middleware body-parser para analizar los datos de las solicitudes en formato JSON (application/json).Esto significa que cuando envías datos en formato JSON en el cuerpo de una solicitud, como en una solicitud AJAX, los datos se analizarán y estarán disponibles en req.body como un objeto JavaScript.

//AJAX permite a las aplicaciones web validar información específica en formularios antes de que los usuarios los envíen. Asynchronous JS and XML.

//operador de propagación (...) para crear un nuevo array que contiene todos los libros existentes (books) más el nuevo libro (newBook). Este nuevo array se convierte a JSON y se guarda en el archivo db.json. 
        //null: No se utilizará función de reemplazo para filtrar o transformar los valores anidados, por eso el 'null'
        //El 3er argumento (2) es el espacio de indentacion que se utilizará para formatear la cadena JSON. 2: Dos espacios para cada nivel, hace que sea más legible.


/* --Con Postman--
app.post('/books', (req,res)=>{
    const book = {
    id: books.length + 1,
    name: req.body.name,
    author: req.body.author,
    category: req.body.category};

    books.push(book),
    res.send(book)
})

*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})