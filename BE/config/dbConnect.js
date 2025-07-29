const mongoose = require('mongoose');

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
        useNEwUrlParser:true,
        useUnifiedTopology:true
        });
        console.log("------- MongoDB Connected ------------ ");
    } catch (error) {
        console.error('error connecting database',error.message)
        process.exit(1);
    }
}
module.exports=connectdb;