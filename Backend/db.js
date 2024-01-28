const mongoose = require('mongoose');
// node "C:\Users\dell\Desktop\React course\inotebook\Backend\index.js"  these is for node app mngo connect

const mongoURI = 'mongodb://127.0.0.1:27017';



const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = connectToMongo;


