const handleRegister = (req,res,database,bcrypt,api) => {
    const { firstname, lastname,email,address,phone,date,password} =req.body;
    if(!firstname || !lastname || !email || !address ||!phone ||!password||!date)
        return res.status(400).json('incorrectform form submission');
        var checkQuery = {
            email: email
        };
        api.check(checkQuery, function (err, result) {
            if (err) {
                return console.log('Check Callback (Error): ' + JSON.stringify(err));
            }
            console.log('Check Callback (Result): ' + JSON.stringify(result.length));
        });
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