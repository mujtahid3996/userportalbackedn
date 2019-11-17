const handleRegister = (req,res,database,bcrypt,api) => {
    const { firstname, lastname,email,address,phone,date,password} =req.body;
    if(!firstname || !lastname || !email || !address ||!phone ||!password||!date)
        return res.status(400).json('incorrectform form submission');
        var checkQuery = {
            email: email
        };
        var  isemailvalid = 0;
        api.check(checkQuery, function (err, result) {
            if (err) {
                isemailvalid = 0;
                return console.log('Check Callback (Error): ' + JSON.stringify(err)+isemailvalid);    
            }
            isemailvalid = 1;
            console.log('Check Callback (Result): ' + result.json());

        });
    if(Boolean(isemailvalid)){
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
    else
     res.status(400).json('wrong email entered');
}

module.exports = {
    handleRegister: handleRegister
};