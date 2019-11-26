const getemail = (req, res, database, api) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json('blankemail');
    }
    var checkQuery = {
        email: email
    };
    api.check(checkQuery)
        .then(function (result) {
            console.log('Check Promise Resolve' + JSON.stringify(result) + result.mx_found);
            if (result.mx_found === true && result.smtp_check === true && result.format_valid === true) {
                database.select('email').from('users')
                    .where('email', '=', email)
                    .then(data => {
                        if (data[0])
                            res.status(200).json('email found')
                        else {
                            res.status(200).json('emailavailable')
                        }
                    }
                    )
                    .catch(err => {
                        console.log(err)
                        res.status(200).json('emailavailable')
                    })
            }
            else {
                res.status(400).json('unavailableemail')
            }
        })
        .catch(function (err) {
            console.log('Check Promise Reject: ' + JSON.stringify(err) + isemailvalid);
            res.status(400).json('wrong email entered');

        })
}
module.exports = {
    getemail: getemail
}