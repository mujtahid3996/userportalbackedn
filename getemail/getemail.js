const getemail = (req,res,database) =>{
    const {email} =req.body;
    database.select('email').from('users')
    .where('email','=',email)
    .then(data => res.status(400).json('email found' ))
    .catch(err => res.status(200).json('emailavailable'))
}
module.exports = {
    getemail :getemail
}