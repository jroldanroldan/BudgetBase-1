const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  dateOfBirth: Date,
  balance: Number,
  avatar: { type: String, default: "https://res.cloudinary.com/imagicat/image/upload/v1575736324/default_avatar_hhrupv.jpg" }
});

// Hash password before saving it into database.
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
  });
});

// Method to validate password.
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;