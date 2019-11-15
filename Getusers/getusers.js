const getusers = (req,res,database) => {
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
}
module.exports = {
    getusers: getusers
}