const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/RegistrationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  Name: String,
  email: String,
  password: String,
  Mobile: String,
  internshipInterest: String,
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/reg.html');
});


app.post('/regi', async (req, res) => {
  try {
    const { Name, email, password, Mobile, internshipInterest } = req.body;
    const newUser = new User({
      Name,
      email,
      password,
      Mobile,
      internshipInterest,
    });
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
