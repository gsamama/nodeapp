const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // decided to use that encryption library for passwords
const schema  = mongoose.Schema;

const userSchema = schema({
  Name: {type: String, required: true, unique: true},
  Password: {type: String, required: true, unique: false, select: false}, 
  Age: {type: Number, required: true, unique: false},
  City: {type: String, required: true, unique: false}
});

// encrypting data
userSchema.pre('save', async function(next){
  let user = this;
  if(!user.isModified('Password')) return next();
  user.Password = await bcrypt.hash(user.Password, 10);
  return next();
});

module.exports = mongoose.model('User',userSchema);

