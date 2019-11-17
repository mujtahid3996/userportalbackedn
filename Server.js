const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex')
var API = require('email-address-validation');
const cors = require('cors');
const bcrypt = require('bcryptjs');
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
const app = express();                      
app.use(cors({credentials:true,origin:true}));
app.use(bodyparser.json());
  var api = new API({
    access_key: '7e059c1a00cb82b6db65c827f2495f08',
  });
app.get('/', ( req,res)=>{
    res.send('working');
})
app.post('/Signin',(req,res) => signin.Signin(req,res,bcrypt,database))
app.post('/Register',(req,res) => {register.handleRegister(req,res,database,bcrypt,api)})
app.post('/Changepassword',(req,res) => {changepassword.Changepassword(req,res,database,bcrypt)})
app.post('/Adminlogin',(req,res)=>{adminlogin.adminlogin(req,res)})
app.post('/getusers', (req,res) =>{ getusers.getusers(req,res,database)})
app.listen(process.env.PORT || 3000);