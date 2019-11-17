const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex')
var API = require('email-address-validation');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const register =require('./Register/Register')
const changepassword =require('./Changepassword/Changpassword')
const signin = require('./Signin/Signin')
const adminlogin=require('./AdminLogin/Adminlogin')
const getusers=require('./Getusers/getusers')
var allowedOrigins = ['http://localhost:3000',
                      'https://mujtahids-user-portal.herokuapp.com'];

app.use(bodyparser.json());
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.options('*',cors());
const database = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
     
    }
  });
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