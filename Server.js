const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex')
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const database = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test123',
      database : 'test'
    }
  });
app.use(cors());
app.use(bodyparser.json());
app.get('/', ( req,res)=>{
    console.log(req.body.date)
    res.send('working');
})
app.post('/Signin',(req,res) => {
    database.select('email','password').from('users')
    .where('email','=',req.body.email)
    .then(data => {
        const  isvalid = bcrypt.compareSync(req.body.password,data[0].password);
        if(isvalid)
        {   
            return database.select('*').from('users')
                .where('email','=',req.body.email)
                .then(user => {
                    console.log(user);
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
        }
        else
        {
            res.status(400).json('wrong credential')
        }

    })
})
app.post('/Register',(req,res) => {
    const { firstname, lastname,email,address,phone,date,password} =req.body;
    const hash = bcrypt.hashSync(password);
    database('users').
    returning('*').
    insert({
       email: email,
       firstname:firstname,
       lastname:lastname,
       address:address,
       phone:phone,
       password:hash,
       birthday:date
     
    }).then(user => {
        console.log(user[0])
        res.status(200).json(user[0]);
    })  
    .catch(err => res.status(400).json(err))
})
app.post('/Changepassword',(req,res) => {
    console.log(req.body.oldpassword);
    database.select('email','password').from('users')
    .where('email','=',req.body.email)
    .then(data => {
        const  issvalid = bcrypt.compareSync(req.body.oldpassword,data[0].password);
        if(issvalid)
        { 
            return database('users').update('password',bcrypt.hashSync(req.body.newpassword))
            .then(user =>{

                res.status(200).json('Changedsuccessfully')
            })
            .catch( err => res.status(400).json('unable to Changepassword'))   
        }
        else
        {
            res.status(400).json('wrong credential')
        }
    })
})
app.post('/Adminlogin',(req,res)=>{
    if(req.body.email === "admin@localhost.local" && req.body.password === "admin")
    {
        res.status(200).json('welcomeadmin');
    }
    else
    {
        res.status(400).json('oops,sorry');
    }
})
app.post('/getusers', (req,res) => {
    if(req.body.email==="admin@localhost.local"){
    return database.select('firstname','phone','email','address').from('users')
    .returning('*')
    .then(users =>{
        console.log(users)
        res.json(users)
    }) 
    .catch(err => res.status(400).json('errrorr'));
}
    else
    res.status(400).json('errror fetching data');
})
app.listen(3000);