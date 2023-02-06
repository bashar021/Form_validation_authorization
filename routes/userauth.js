'use strict'
const express = require('express')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
const bcrypt = require('bcrypt');
var app = express()
var router = express.Router()
var { body, validationResult } = require('express-validator');
var userbcryptpassword = require('../midelwares/BcryptedPass')
var checkexistuser = require('../midelwares/Checkexistuser')
var Token_validation = require('../midelwares/Token_validation')
const User = require('../modals/User') // importing user schema
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
router.use(cookieParser())


// signin route 
router.post('/signup',[body('password','password must be atleast 5 chracter').isLength({min:6}),body('email','email is not valid').isEmail(),body('number','number is not valid').isLength({min:10})],[checkexistuser ,userbcryptpassword],async function(req,res){
    // giving an error of express validations when the userser input data foes not match 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()}); // retruning the array of errors ocuring in the user data 
    }
    try{
        const user = await User.create({name:req.body.name,number:req.body.number,email:req.body.email,password:req.securepassword})
        if(user){
            const data = {
                user :{id:user.id}
            }
            const authtoken = jwt.sign(data,process.env.SECRET_KEY) // genrating the authtoken for user 
            res.cookie("jwt", authtoken, {httpOnly: true,secure:true,expires:new Date(Date.now()+1000000)}) // saving the authtoken for the user in the cookie
            return res.send('signup has been succesfuly')
        }
    }catch(error){
        console.log('unable to create ')
        return res.status(400).json({ message: "unable to signin"});
    }
})



//  login route 
router.post('/login',[body('password','password must be atleast 6 chracter').isLength({min:6}),body('email','email is not valid').isEmail()],async function(req,res){
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.redirect('/login') //rediret user to signup page it does not exists 
            // return res.status(400).json({ message: "please insert valid username or password "});
        }
        else if(user){
            const userpass = await bcrypt.compare(req.body.password, user.password);
            if(!userpass){
                return res.status(400).json({ message: "please insert valid username or password "});
            }
            const data = {
                user :{id:user.id}
            }
            const authtoken = jwt.sign(data,process.env.SECRET_KEY) // genrating the authtoken for user 
            res.cookie("jwt", authtoken, {httpOnly: true,secure:true,expires:new Date(Date.now()+1000000)}) // 
            res.json(user)
        }

    }catch(error){
        return res.status(500).send();

    }
    
})


router.get('/profile',[Token_validation],async function(req,res){   
    // giving the user required information with the help of id get from the token 
    const user =  await User.findById({_id:req.userId}).catch(err=>{
                    return res.status(500).send()
                })
                
    res.json(user)   
})
module.exports = router;