const express = require('express')
const app = express()

//routes
app.get('/',(req, res)=>{
    res.send('Colors API')
})

app.listen(4000, ()=> {
    console.log('Node API app is running on port 4000')

})