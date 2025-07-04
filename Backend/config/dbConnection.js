const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database succeesfully connected..');
    } catch (error) {
        console.log(`Connection Failed! ${error.messgae}`);
    }
}

module.exports = connectDB