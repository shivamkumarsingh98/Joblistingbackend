const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const jobdata = new Schema({
  name: {
    type: String, required: true
  },
  logourl: {
    type: String, required: true
  },
  position: {
    type: String, required: true
  },
  salary: {
    type: Number, required: true
  },
  jobtype: {
    type: String, required: true
  },
  worktype: {
    type: String, required: true
  },
  location: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  about: {
    type: String, required: true
  },
  skills: {
    type: [String], required: true
  },
  information: {
    type: String, required: true
  },
  userid:{
    type:mongoose.Schema,
    type:Object,
    require:true
  }

})


module.exports = mongoose.model("jobdata",jobdata)