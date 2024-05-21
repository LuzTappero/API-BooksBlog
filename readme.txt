const express = require("express");
const app = express();
app.use(express.json());
const path = require("path")

// '/' ruta o endpoint; cuando el servidor detecta que alguien entro a esa ruta, se dispara la accion

app.get("/students", (request, response)=>{
    response.status(200).json({ succes : true});
})


app.get("/students/note", (request, response)=>{
    const filePath = path.resolve("public", "index.html")
    response.status(200).sendFile(filePath)
})

app.get("/students/list/", (request, response)=>{
    const pathList = path.resolve("public", "students.html")
    response.status(200).sendFile(pathList)
})

app.get("/students/list/*", (request, response)=>{
    const pathList = path.resolve("public", "students1.html")
    console.log(req.url);
    response.status(200).sendFile(pathList)
})



// const studentId = students.find (c => c.id === parseInt(req.params.id));
// if (!studentId) return res.status(404).send('Student not found');
// else res.send(studentId)

app.post("/", (request, response)=>{
})



const port= 8080;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));