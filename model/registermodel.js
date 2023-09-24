const mongoose = require('mongoose');

const registerschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String }
})

const register1 = mongoose.model('Register', registerschema);

module.exports = register1;