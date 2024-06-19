const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    default: ['Praca', 'Szkoła', 'Dom', 'Zakupy', 'Przypomnienie', 'Sport']
  }
});

module.exports = mongoose.model('User', UserSchema);
