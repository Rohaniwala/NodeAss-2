const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./DB/Config');
const stud = require('./model/registermodel.js');
const registermod = require('./model/registermodel');
const validator = require('express-validator');
const multer = require('multer');
// 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('Register');
    // res.write("hello world!");
    // res.end();
})
// ================== validation start =================

// const validateform = [
//     validator.check('name', 'name is required').not().isEmpty(),
//     validator.check('email', 'email is required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     validator.check('password', 'password is required').isLength({ min: 5 })
// ]



// ================== finish validation =================

// ================== Start File Upload =================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const Upload = multer({ storage: storage })


// ================== Finish File Upload =================

// app.post('/register', Upload.single("profile"), validateform, async (req, res) => {
    app.post('/register', Upload.single("profile"),  async (req, res) => {

   // const error = validator.validationResult(req);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.file.filename;

    try {
        const newstudent = new stud({
            name: name,
            email: email,
            password: password,
            profile: profile
        });
        await newstudent.save();
        console.log("inserted")
        res.send("inserted");
    } catch (err) {
        console.error(err);
    }
})


app.listen(2000, () => {
    console.log("listening on port on 2000");
})

