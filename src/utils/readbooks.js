const fs= require("fs/promises");
const path = require("path");
const express= require ('express');
const app = express();
app.use(express.json()); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const { read } = require('fs');


const dbPath = path.join(__dirname, "../../db", "db.json");

async function readBookFromJson(){
    try{
        const data= await fs.readFile(dbPath, 'utf-8');
        const books= JSON.parse(data)
        return books;
    }catch(err){
        console.error('Error reading or parsing the file', err);
        throw err;
    }
}
module.exports = readBookFromJson;
