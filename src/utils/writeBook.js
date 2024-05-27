const fs= require("fs/promises");
const path = require("path");
const express= require ('express');
const app = express();
app.use(express.json()); //1°
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//2°
app.use(bodyParser.json());//3°
app.use(express.static(path.join(__dirname, 'public')));//4°
const { read } = require('fs');
const dbPath = path.join(__dirname, "../../db", "db.json");
const readBookFromJson = require('../utils/readbooks.js')

async function writeBookInJson(BookData){
    try{
        const books= await readBookFromJson();
        const newBook={
            id: books.length + 1, 
            name: BookData.name,
            author: BookData.author, 
            category: BookData.category
        };
        books.push(newBook);
        await fs.writeFile(dbPath, JSON.stringify(books, null,2));
        return newBook;
       
    }catch(error){
        console.error('Error writing to JSON File', error);
        throw new Error('Error writing to JSON file');
    }
}

module.exports= writeBookInJson;