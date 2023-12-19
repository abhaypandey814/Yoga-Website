const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();



// taking a value from the enviroment variable 
const port = process.env.PORT || 3000;
const uri = process.env.MONGODBURI;

app.use(bodyParser.json());
app.use(cors());



// Connection to MongoDB
mongoose.connect(uri).then(() => {
  console.log("Connected to the database");
}).catch((err) => {
  console.log("Error in database connection:", err)
});



// schema for the database
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: Number,
  gender: String,
  email: String,
  schedule: String,
  paymentStatus: Boolean,
});

const User = mongoose.model('User', userSchema);

// Route to submit a user from and store to database
app.post('/enroll', async (req, res) => {
  try {
    const { name, email, phone, gender, age, schedule, paymentStatus } = req.body;

    // Validate age
    if (age < 18 || age > 65) {
      return res.status(400).json({ error: 'Invalid age. Must be between 18 and 65.' });
    }
    // Create a new User instance
    const user = new User({ name, email, phone, gender, age, schedule, paymentStatus: true });
    // Save the user to the database
    await user.save();
    res.status(200).json({ message: 'Enrollment successful.' });
  } catch (error) {
    // Check if the error is due to age validation
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});



// Route to get all enrolled users with names and emails
app.get('/enroll', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ name: -1 })
      .select(['name', 'email']);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
