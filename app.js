const path = require("path");
const express= require ('express');
const app = express();
const booksRouter= require('./src/routes/routesBooks.js')
app.use(express.static(path.join(__dirname,'public', 'css')));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const logRequest = require('./src/middlewares/logMD.js')

app.use(logRequest);

app.use('/books', booksRouter);







const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})