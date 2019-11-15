const Changepassword = (req,res,database,bcrypt) => {
    
    database.select('email','password').from('users')
    .where('email','=',req.body.email)
    .then(data => {
        const  issvalid = bcrypt.compareSync(req.body.oldpassword,data[0].password);
        if(issvalid)
        { 
            return database('users').update('password',bcrypt.hashSync(req.body.newpassword))//password hashing here
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
}
module.exports ={
    Changepassword: Changepassword
}