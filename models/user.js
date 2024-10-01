const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: String,
  postingLink: String,
  status: { 
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
    required: true,
  },
  
})
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema], // embedding the applicaitonSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
