const getemail = (req, res, database) => {
    const { email } = req.body;
    database.select('email').from('users')
        .where('email', '=', email)
        .then(data => {
            if (data.email !== '')
                res.status(400).json('email found')
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
module.exports = {
    getemail: getemail
}