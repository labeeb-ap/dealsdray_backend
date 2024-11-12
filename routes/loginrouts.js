const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.js');
const Employee = require('../models/Employee');



router.post('/userlogin', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Username:', username);
    console.log('Password:', password);

    const user = await User.findOne({ username, password });

    if (user) {
      console.log('User exists:', user);
      res.status(200).json({
        code: 200,
        data: user,
        success: true
      });
    } else {
      console.log('User does not exist');
      res.status(404).json({
        code: 100,
        message: "User does not exist",
        success: true
      });
    }

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







router.post('/list', async (req, res) => {
  try {
    // Fetch all employees from the Employee collection
    const employees = await Employee.find();
    console.log(employees); // Mongoose method to find all documents

    if (employees.length > 0) {
      // If employees exist, send them as a response
      res.status(200).json({
        success: true,
        message: 'Employees retrieved successfully',
        data: employees // Return the fetched employees
      });
    } else {
      // If no employees exist
      console.log('No employees found');
      res.status(404).json({
        code: 100,
        message: "No employees found",
        success: false
      });
    }
  } catch (error) {
    // Handle any errors during the fetch operation
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





router.post('/create', async (req, res) => {
  try {
    const {  name, email, mobileNo, designation, gender, course, imgUpload } = req.body;
    console.log(req.body);
    console.log(  name, email, mobileNo, designation, gender, course, imgUpload);

    // Check if email already exists
    

    // Create and save a new Employee document
    const employee = new Employee({
      
    
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      imgUpload,
    });

    await employee.save();

    res.status(201).json({ success: true, message: 'Employee registered successfully', employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});









router.post('/update', async (req, res) => {
  try {
    console.log(req.body);
    console.log("hi")
    const {  _id,name, email, mobileNo, designation, gender, course, imgUpload } = req.body


    // Check if the employee exists
    const existingEmployee = await Employee.findById(_id);
    if (!existingEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Optional: Check if email already exists and belongs to a different employee
    

    // Update the employee fields
    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id,
      { name, email, mobileNo, designation, gender, course, imgUpload },
      { new: true, runValidators: true } // new: true returns the updated document, runValidators ensures validation
    );

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





















module.exports = router;
