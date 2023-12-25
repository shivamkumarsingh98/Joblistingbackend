const mongoose = require('mongoose')


const Schema = mongoose.Schema;


const userScima = new Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
});



 

module.exports = mongoose.model("USER", userScima);