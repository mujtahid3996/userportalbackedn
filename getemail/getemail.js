const getemail = (req,res,database) =>{
    const {email} =req.body;
    database.select('email').from('users')
    .where('email','=',email)
    .then(data => {
        console.log(data)
        res.status(400).json('email found' )}
        )
    .catch(err => {
        console.log(err)
        res.status(200).json('emailavailable')
        })
}
module.exports = {
    getemail :getemail
}