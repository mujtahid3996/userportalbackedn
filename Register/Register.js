const handleRegister = (req,res,database,bcrypt,api) => {
    const { firstname, lastname,email,address,phone,date,password} =req.body;
    if(!firstname || !lastname || !email || !address ||!phone ||!password||!date)
        return res.status(400).json('incorrectform form submission');
        var emailisvalid =false; 
        var checkQuery = {
            email: email
        };
        api.check(checkQuery)
        .then(result => result.json()) 
        .then(data => {
            if(data.mx_found === true && smtp_check===true)
                emailisvalid =true;
            else
                emailisvalid =false;
        })
        .catch(err => res.status(400).json('invalidemail'))
    if(emailisvalid)
    {
        console.log('email ok');
    }
    else
    {
        return res.status(400).json('wrong email enterd')
    }
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