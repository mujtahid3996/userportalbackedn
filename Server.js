const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex')
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const register =require('./Register/Register')
const changepassword =require('./Changepassword/Changpassword')
const signin = require('./Signin/Signin')
const adminlogin=require('./AdminLogin/Adminlogin')
const getusers=require('./Getusers/getusers')
const database = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });
app.use(cors());
app.use(bodyparser.json());
app.get('/', ( req,res)=>{
    res.send('working');
})
app.post('/Signin',(req,res) => signin.Signin(req,res,bcrypt,database))
app.post('/Register',(req,res) => {register.handleRegister(req,res,database,bcrypt)})
app.post('/Changepassword',(req,res) => {changepassword.Changepassword(req,res,database,bcrypt)})
app.post('/Adminlogin',(req,res)=>{adminlogin.adminlogin(req,res)})
app.post('/getusers', (req,res) =>{ getusers.getusers(req,res,database)})
app.listen(process.env.PORT || 3000);