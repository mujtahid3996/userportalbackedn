const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());
app.get('/', ( req,res)=>{
    res.send('working');
} )
app.post('/Signin',(req,res) => {
    if(req.body.email === 'aaa@gmail.com')
         res.status(200).json('wow');
    else
        res.status(400).json('oops');
})
app.post('/Register',(req,res) =>{
    let user = {
        firstname :req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        date:req.body.date
    }
    res.status(200).json(user);
    
})

app.listen(3000)