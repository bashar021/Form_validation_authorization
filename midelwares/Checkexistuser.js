const User = require('../modals/User') // importing user schema
async function Checkexistuser(req,res,next){
    const email = req.body.email
    const user = await User.find({ email:req.body.email});
    User.find({ email:req.body.email},function(err,result){ // cheking is the user with that email is eixst or not 
        if(err){
            console.log(err)
        }
        if(result != null){
            return res.send('user already exists ');

        }else{
            next()
        }
    })
}
module.exports = Checkexistuser;