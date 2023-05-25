const express = require('express')
const path = require('path')
const { v4:uuidv4 } = require('uuid');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(express.static('public'))
app.use(routes)

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','notes.html'))
})


app.listen(PORT,()=>{
    console.log('app listening on '+PORT)
})