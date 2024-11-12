const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const login = require('./routes/loginrouts.js');

// Initialize dotenv to load environment variables
dotenv.config();




const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// Set up basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/login', login);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    
}).then(() => {
    console.log("MongoDB connected");
    // Start the server after successful database connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    // Exit the process if unable to connect to MongoDB
    process.exit(1);
});
