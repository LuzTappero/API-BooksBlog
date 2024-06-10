const fs= require("fs/promises");
const path = require("path");
const dbPath = path.join(__dirname, "../../db", "db.json");

async function writeInDB(BookData){
    try{
        await fs.writeFile(dbPath, JSON.stringify(BookData, null,2));
    }catch(error){
        console.error('Error writing to JSON File', error);
        throw new Error('Error writing to JSON file');
    }
}
module.exports= writeInDB;