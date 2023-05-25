const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

app.listen(PORT,()=>{
    console.log('app listening on '+PORT)
})