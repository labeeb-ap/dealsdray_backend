const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  
  name: { type: String },
  email: { type: String },
  mobileNo: { type: String },
  designation: { type: String },
  gender: { type: String },
  course: { type: [String], required: true },
  imgUpload: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
