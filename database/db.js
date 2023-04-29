const mongoose = require('mongoose');


mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGO_URL,{
    dbName:process.env.DB_NAME
}).then(()=>{
    console.log('connected!');
}).catch((err)=>{
    console.log(err);
})



module.exports = mongoose;