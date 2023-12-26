const mongoose = require('mongoose');
const mongoURI =  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"

const connectToMongo = ()=> {
    mongoose.connect(mongoURI) 
        console.log("connected to mongo successfully");
    
}
  module.exports = connectToMongo;