# Login/Signup validation and authentication

## Credits
This software uses the following source 
* Node.js
* Express.js
* HTML
* CSS
* MongodDb
* Mongoose

## Packages used
```javascript
require('express');
require('mongoose');
require('express-validator');
require('dotenv');
require('bcrypt');
require('jsonwebtoken');
require('cookie-parser');
require('body-parser');
require('path')



```

Use the package manager Npm to install foobar.

```bash
npm install foobar
```

## Getting Started
Clone a project and you can start a project by
```
npm start

```

# Usage

## express.js
```
npm install express
```

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## mongoose
```
npm install mongoose
```
```javascript
//connecting db
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'))
  .catch(err=> console.log(err));
```
```javascript
//schema to for storing the data into db
const UserSchema = new Schema({
    name:{type:String,required:true},
    email :{type:String,required:true,unique:true},
    number:{type:String,minLength:10,required:true},
    password:{type:String,required:true},
    date: { type: Date, default: Date.now },
});
const User = mongoose.model('user', UserSchema);
```
## express-validation
express-validation is used to check sufficent and required values of the client before disturbing the server 
```
npm install express-validation
```
```javascript

const { body, validationResult } = require('express-validator');
app.get('/login',[body('password','password must be atleast 6 chracter')
.isLength({min:6}),body('email','email is not valid').isEmail()],function(req,res){
// retruning the array of errors ocuring in the user data 
//it send error message in the form of array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()}); 

    }

    res.send('login)
})

```

## dotenv
```
npm install dotenv
```
create a  .env file in project
```javascript
SECRET_KEY="yoursecretkey"
```

```javascript
const dotenv = require('dotenv').config()
const port = process.env.PORT || 80

console.log(process.env.SECRET_KEY)

```
## bcrypt
```
npm install bcrypt
```
converting plain password into a hash password 
```javascript
const bcrypt = require('bcrypt');
// genrating a salt to add extra security to our password 
const salt = await bcrypt.genSalt(10)
//converting plainpassword into hash pasword 
const securepassword = await bcrypt.hash("your plain passoword",salt)

```
comparing the user plain password with the hash password stored in db 
```javascript
const userpass = await bcrypt.compare("user plain password ", 'hash password stored in db');
```
## jsonwebtoken
```
npm jsonwbetoken
```
jwt is used to generate the token for validation of user 

```javascript
var jwt = require('jsonwebtoken');
// signed token
var token = jwt.sign({ foo: 'bar' }, "your secret key");
//            or 
//Sign asynchronously
jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});
```
```javascript
var result = jwt.verify(token, 'your secret key');
console.log(decoded.foo) // bar
//          or
jwt.verify(token, 'your secret key', function(err, result) {
  console.log(result.foo) // bar
});
```
## cookie-parser
cookie-parser is used for saving the jwt token into the cookies of the client and when there is a need of user validation we will use that token from the cookies 
```
npm install cookie-parser
```
```javascript
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
app.get('/', function (req, res) {
//saving cookie with the expires time 
 res.cookie("jwt", "your token", {httpOnly: true,secure:true,expires:new Date(Date.now()+1000000)})
 
 res.send('cookie has stored ')
})



app.get('/getcookie', function (req, res) {
console.log(req.cookies.jwt);
  
})

app.listen(8080)


```

## body-parser
```
npm install body-parser
```
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```






