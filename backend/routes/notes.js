const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route 1: All the Notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.messege);
        res.status(500).send("some Error occured");
    }

})

// Route 2: Add a new Note using: POST "/api/notes/addnotes". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleat 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        // if there are errors, return Bad request and the errors 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)

    } catch (error) {
        console.error(error.messege);
        res.status(500).send("some Error occured");
    }
})

  

module.exports = router