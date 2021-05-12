const mongoose = require('mongoose');

const InstSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  board: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  phone: [{
    type: String,
    required: true
  }],
  email: {
    type: String,
    required: true
  },
}, {collection: "instCollection"});



const Inst = mongoose.model("instCollection", InstSchema);
module.exports = Inst;