const fs= require("fs/promises");
const path = require("path");
const express= require ('express');
const app = express();
app.use(express.json()); //1°
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//2°
app.use(bodyParser.json());//3°
app.use(express.static(path.join(__dirname, 'public')));//4°
const dbPath = path.join(__dirname, "../../db", "db.json");


async function writeBookInJson(BookData){
    try{
        await fs.writeFile(dbPath, JSON.stringify(BookData, null,2));
    }catch(error){
        console.error('Error writing to JSON File', error);
        throw new Error('Error writing to JSON file');
    }
}
module.exports= writeBookInJson;