const express = require('express')
const mongoose = require('mongoose')
const color = require ('./models/colorModel')
const app = express()

app.use(express.json())

//routes
app.get('/',(req, res)=>{
    res.send('Colors API')
})


app.post('/color',async (req, res)=>{
    //console.log(req.body);
    //res.send(req.body)

    try {
        const color = await color.create(req.body)
        res.status(200).json(color);
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})



mongoose.connect('mongodb+srv://dbarker718_db_user:password12345@cluster0.dj98gk4.mongodb.net/colors')
.then(()=>{
    app.listen(4000, ()=> {
    console.log('Node API app is running on port 4000')
    console.log('connected to MongoDB')});
}).catch((error)=>{
    console.log(error)})