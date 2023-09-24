const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Register")
    .then(() => {
        console.log("connection success");
    })
    .catch((err) => {
        console.log(err);
    })
