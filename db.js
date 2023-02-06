const mongoose = require('mongoose'); 

function ConnectToDb(){
    mongoose.connect('mongodb://127.0.0.1:27017/userauth',()=>{
        console.log('connected to db succesfuly')
    }).catch(err=> console.log(err))
}
module.exports =  ConnectToDb //exporting the mongose connections 