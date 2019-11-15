const adminlogin = (req,res)=>{
    if(req.body.email === "admin@localhost.local" && req.body.password === "admin")
    {
        res.status(200).json('welcomeadmin');
    }
    else
    {
        res.status(400).json('oops,sorry');
    }
}
module.exports ={
    adminlogin:adminlogin
}