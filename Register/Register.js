const handleRegister = (req,res,database,bcrypt) => {
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
}

module.exports = {
    handleRegister: handleRegister
};