const jwt = require('jsonwebtoken');
const Note = require('../models/note');

class NoteController {
    async getAllNotes(req, res) {
        let doc;

        const token = req.header('authorization');
        let decoded = jwt.decode(token);
        let creator = decoded._id

        const itemType = req.params.itemType

        try {
            doc = await Note.find({creator: creator, type: itemType});
        } catch(err) {
            res.status(500).json({message: err.message});
        }
        res.status(200).json(doc);

    }
    async getNote(req, res) {
         let note;
        const id = req.params.id;
        try {
            note = await Note.findOne({_id: id});
        } catch(err) {
            res.status(500).json({message: err.message});
        }

        res.status(200).json(note);
    }
    async saveNote(req, res) {

        const type = req.body.itemType;
        const title = req.body.title;
        const body = req.body.body;
        const token = req.body.creator;
        let decoded = jwt.decode(token);
        let creator = decoded._id


        let note;

        try {
            note = new Note({type, creator, title, body})
            await note.save();
        } catch(err) {
            return res.status(422).json({message: err.message});
        }

        res.status(201).json(note)
    }
    async updateNote(req, res) {
        const id = req.params._id;
        const title = req.body.title;
        const body = req.body.body;

        let note;

        try {
            note = await Note.findOne({_id: id});
            note.title = title;
            note.body = body;
            await note.save()
        } catch(err) {
            return res.status(422).json({ message: err.message});
        }

        res.status(201).json(note);
    }
    async deleteNote(req, res) {

        const id = req.params.id;

        await Note.deleteOne({_id: id});

        res.sendStatus(204)
    }
}

module.exports = new NoteController();
