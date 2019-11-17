const Signin = (req,res,bcrypt,database) => {
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
                    res.header("Access-Control-Allow-Origin", "*").json(user[0])
                })
                .catch(err => res.status(400).header("Access-Control-Allow-Origin", "*").json('unable to get user'))
        }
        else
        {
            res.status(400).header("Access-Control-Allow-Origin", "*").json('wrong credential')
        }

    })
}
module.exports = {
    Signin :Signin
}