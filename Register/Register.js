var  isemailvalid = 0;
const handleRegister = (req,res,database,bcrypt,api) => {
    const { firstname, lastname,email,address,phone,date,password} =req.body;
    if(!firstname || !lastname || !email || !address ||!phone ||!password||!date)
        return res.status(400).json('incorrectform form submission');
        var checkQuery = {
            email: email
        };
        api.check(checkQuery)
    .then(function (result) {
        isemailvalid = 1;
        console.log('Check Promise Resolve' + JSON.stringify(result)+isemailvalid);
    })
    .catch(function (err) {
        isemailvalid = 0;
        console.log('Check Promise Reject: ' + JSON.stringify(err) +isemailvalid);
    });
    console.log(isemailvalid);
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