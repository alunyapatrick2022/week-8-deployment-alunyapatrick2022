const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

dotenv.config({ path: './.env' });

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use(express.json());
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

//connection to the db
const db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME
});

//check if connection works
db.connect((err) => {
     if (err) return console.log("Error connecting to database.");

     console.log("Connected to MySQL as id:", db.threadId);
})

//users registration route
app.post('https://powerlearn-project-week-8-deployment.netlify.app/api/register', async (req, res) => {
     try {
          const users = `SELECT * FROM users WHERE email = ?`
          //check if user exists
          db.query(users, [req.body.email], (err, data) => {
               if (data.length) return res.status(409).json("User already exists");

               //Password Hashing
               const salt = bcrypt.genSaltSync(10)
               const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

               const newUser = `INSERT INTO users(email, username, password) VALUES(?)`
               value = [
                    req.body.email,
                    req.body.username,
                    hashedPassword
               ]
               
               db.query(newUser, [value], (err, data) => {
                    if (err) return res.status(400).json("Something went wrong")
                    
                    return res.status(200).json("User created successfully")
               });
          })
     }
     catch (err) {
          res.status(500).json("Internal Server Error")
     }
})

//user login route
app.post('https://powerlearn-project-week-8-deployment.netlify.app/api/login', async (req, res) => {
     try {
          const users = `SELECT * FROM users WHERE email = ?`
          db.query(users, [req.body.email], (err, data) => { 
               if (data.length === 0) return res.status(404).json("User not found");

               const isPasswordvalid = bcryptjs.compareSync(req.body.password, data[0].password);

               if (!isPasswordvalid) return res.status(400).json("Invalid email or password");

               return res.status(200).json("Login Successful");
          })

     }
     catch (err) {
          res.status(500).json("Internal Server error");
     }
})

//Password reset route

app.put('https://powerlearn-project-week-8-deployment.netlify.app/api/reset', async (req, res) => {
    try {
        const users = `SELECT * FROM users WHERE email = ?`;
        db.query(users, [req.body.email], (err, data) => {
            if (data.length === 0) return res.status(404).json("User not registered an account");

            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

            const newPasswordQuery = `UPDATE users SET password = ? WHERE id = ?`;
            const values = [hashedPassword, data[0].id];

            db.query(newPasswordQuery, values, (err, result) => {
                if (err) return res.status(400).json("Something went wrong");

                return res.status(200).json("Password changed successfully");
            });
        });
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
});

// Dashboard route
app.get('https://powerlearn-project-week-8-deployment.netlify.app/api/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: `Welcome to your dashboard, ${req.user.username}` });
  } else {
    res.status(401).json({ error: 'Unauthorized. Please log in to access your dashboard.' });
  }
});

app.listen('https://powerlearn-project-week-8-deployment.netlify.app/', () => {
     console.log("Server is running on https://powerlearn-project-week-8-deployment.netlify.app/")
})
