const router = require('express').Router();
const fs = require('fs')
const { v4:uuidv4 } = require('uuid'); //uuid package is used to generate random unique id
router.get('/',(req,res)=>{
    fs.readFile('./db/db.json','utf-8',(err,result)=>{
        if(err){
            console.error(err)
        }else{
            res.json(JSON.parse(result))
        }
    })

    
});

router.post('/',(req,res)=>{
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        if(err){
            console.error(err)
        }else{
            const parsedNote = JSON.parse(data)
            const newNote = {
                id : uuidv4(),
                title : req.body.title,
                text : req.body.text
            };
            parsedNote.push(newNote)
           
            fs.writeFile('./db/db.json',JSON.stringify(parsedNote,null,4),(err)=>
               err?console.error(err):res.send('success!')
            )
        }
    })
 
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the note.' });
      } else {
        try {
          const parsedNote = JSON.parse(data);
          const updatedNotes = parsedNote.filter(element => element.id !== id);
          fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), 'utf-8', (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Failed to delete the note.' });
            } else {
              res.status(200).json({ message: 'Note deleted successfully.' });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to delete the note.' });
        }
      }
    });
  });

  module.exports = router