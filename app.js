const path = require("path");
const express= require ('express');
const app = express();
const booksRouter= require('./src/routes/routesBooks.js')
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const logRequest = require('./src/middlewares/logMD.js')

app.use(logRequest);//Me muestra en consola la solicitud recibida.

app.use('/books', booksRouter);







const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})