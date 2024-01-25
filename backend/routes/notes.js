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
    body('description', 'description must be atleat 20 character').isLength({ min: 5 }),
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

// Route 3: Update an existing Note using: POST "/api/notes/updatenote". login required
 router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const { title, description, tag} = req.body;
    // Create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");    
    }

    note =  await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

    res.json({note});


  }) 

  
// Route 4: Deleting an existing Note using: DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    const { title, description, tag} = req.body;
    
    
    // find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}
    
    // Allow deletion if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");    
    }
  
    note =  await Notes.findByIdAndDelete(req.params.id)
  
    res.json({"Success": "Note has been deleted"});
}) 

 module.exports = router