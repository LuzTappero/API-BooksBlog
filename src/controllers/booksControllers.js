const path = require("path");
const bookModel = require('../models/modelBook.js');

class BookController{
    static async getAll(req,res){
        const getAllBooks= await bookModel.getAll()
        res.send(getAllBooks)
    }

    static async getByID(req,res){
        const id = req.params.id;
        const getById= await bookModel.getByID(id)
        res.send(getById)
    }

    static async getByName(req,res){
        const name = req.params.name;
        const getByName = await bookModel.getByName(name)
        res.send(getByName)
    }

    static async getByCategory(req,res){
        const category= req.params.category;
        const getByCategory = await bookModel.getByCategory(category)
        res.send(getByCategory)
    }

    static async getByauthor(req,res){
        const author = req.params.author;
        const getByAuthor = await bookModel.getByAuthor(author)
        res.send(getByAuthor)
    }
    static async showForm(req,res){
        await res.sendFile(path.join(__dirname, '../views/HTML', 'form.html'));
    }
    static async create(req,res){
        try{
            const newBook = await bookModel.createBook(req.body)
            res.sendFile((path.join(__dirname, '../views/HTML', 'createOK.html')))
        }
        catch(error){
            console.error('Error', error)
            res.status(500).send({ error: 'Failed to create the new book' });
        }








        // try {
        //     if(!req.body || !req.body.name || !req.body.author || !req.body.category){
        //         throw new Error('Invalid request body');
        //     }
        //     const newBook = await writeBookInJson(req.body);
        //     return res.redirect('/books')
        // }catch(error){
        //     console.error('Error creating book:', error);
        //     return res.status(500).json({ error: 'Error creating book' });
        // }
    }
    static async delete (req,res){
        const id = req.params.id;
        try{
            const result= await bookModel.delete(id)
            if (result === false)
                {return res.status(404).send({message: "book not found to delete"})
        }
                return res.send({message: 'Book deleted'})
        }
        catch(error){
            console.error(error)
            res.status(500).send({ error: 'Failed to delete the book' });
        }
    }
    static async update(req,res){
        const id = req.params.id;
        const bookData= req.body;
        const updatedBook= await bookModel.update(id, bookData)
        return res.send(updatedBook)
    }
}

module.exports = BookController;