const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
const PDFDocument = require('pdfkit');
const fs = require('fs');

dotenv.config({ path: './.env' });

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: crypto.randomBytes(64).toString('hex'), // Generates a secure random secret
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: { 
    secure: true, // Set to true if using HTTPS
    maxAge: 60000 // Cookie expires after 1 minute (optional)
  }
}));

   app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });
 

app.use(express.json());
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

//connection to the db
function handleDisconnect() {
  const pool = mysql.createPool({
      connectionLimit: 10,  // Adjust the limit according to your application's needs
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  });

  pool.getConnection((err, connection) => {
      if (err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              console.error('Database connection lost. Reconnecting...');
              handleDisconnect();  // Reconnect if the connection is lost
          } else {
              console.error('Error connecting to the database: ', err);
              setTimeout(handleDisconnect, 10000);  // Retry after 10 seconds if there's a connection error
          }
      } else {
          console.log('Connected to the database.');
          connection.release();  // Release the connection back to the pool after successful connection
      }
  });

  pool.on('error', (err) => {
      console.error('Database error: ', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleDisconnect();  // Reconnect if the connection is lost
      } else {
          throw err;
      }
  });

  return pool;
}

const pool = handleDisconnect();
 

// Route for the home page
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });

app.post('/public/register', async (req, res) => {
     try {
         // Check if user exists
         const users = `SELECT * FROM users WHERE email = ?`;
         
         pool.query(users, [req.body.email], (err, data) => {
               if (err) {
                    console.error(err);
                    return res.status(500).json("Database error");
               }
               if (data.length  > 0) {
                    return res.status(409).json("Email registered! Please Login");
               }
               // Password Hashing
               const salt = bcrypt.genSaltSync(10);
               const hashedPassword = bcrypt.hashSync(req.body.password, salt);
     
               // Insert new user
               const newUser = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
               const values = [
                    req.body.username, 
                    req.body.email, 
                    hashedPassword
                    ];
 
               pool.query(newUser, values, (err, data) => {
                    if (err) {
                         console.error(err);
                         return res.status(400).json("Something went wrong");
                    }

                    return res.status(200).json("User created successfully");
               });
         });
     } catch (err) {
         console.error(err);
         res.status(500).json("Internal Server Error");
     }
 });

//user login route
app.post('/public/login', async (req, res) => {
     try {
          const users = `SELECT * FROM users WHERE email = ?`;
          pool.query(users, [req.body.email], (err, data) => { 
               if (data.length === 0) return res.status(404).json("User not found");

               const isPasswordvalid = bcrypt.compareSync(req.body.password, data[0].password);

               if (!isPasswordvalid) return res.status(400).json("Invalid email or password");

               return res.status(200).json("Login Successful");
          })

     }
     catch (err) {
          console.error(err);
          res.status(500).json("Internal Server Error");
      }
})

//Logout Route
app.get('/public/logout', (req, res) => {
     req.session.destroy((err) => {
       if (err) {
         return res.status(500).send('Failed to log out');
       }
       res.send('Logged out successfully');
     });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
     if (req.isAuthenticated()) {
       res.json({ message: `Welcome to your dashboard, ${req.user.username}` });
     } else {
       res.status(401).json({ error: 'Unauthorized. Please log in to access your dashboard.' });
     }
   });

//Password reset route
app.put('/reset', async (req, res) => {
    try {
        const users = `SELECT * FROM users WHERE email = ?`;
        pool.query(users, [req.body.email], (err, data) => {
            if (data.length === 0) return res.status(404).json("User not registered an account");

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newPasswordQuery = `UPDATE users SET password = ? WHERE email = ?`;
            const values = [hashedPassword, data[0].id];

            pool.query(newPasswordQuery, values, (err, result) => {
                if (err) return res.status(400).json("Something went wrong");

                return res.status(200).json("Password changed successfully");
            });
        });
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
});

//Add expenses routing
app.post('/add_expenses', async (req, res) => { 
     try {
         const { expense, amount, date, categoryName, paymentMethod } = req.body;

         const expenses = pool.query(`SELECT * FROM  expenses WHERE user_id = ? AND expense = ?`, [req.user.id, expense]);
         console.log(expenses);
         if (expenses.length > 0) {
          return res.status(400).json({ error: 'Expense already added'});
         }
         else {

         // Insert the new expense
         console.log("Inserting expenses");
         const newExpense = await pool.query(`INSERT INTO expenses (user_id, expense, amount, expense_date) VALUES (?, ?, ?, ?)`, [users[0].id , expense,amount, expense_date]);
         const values = [
          req.user.id,
          expense,
          amount,
          expense_date
         ];
     
         //Query to add new expenses values
         db.query(newExpense, values, (err, data) => {
          if (err) {
               console.error(err);
               return res.status(400).json("Something went wrong");
          }

          return res.status(200).json("Operation Successful.");
     });
}

     //Checking if category exist
     const categories = db.query(`SELECT * FROM categories WHERE user_id = ? AND category = ?`, [req.user.id, category]);
     if (categories.length > 0) {
          return res.status(400).json({ error: 'Category already exists'});
     }
     else {
          //Insert Categories 
          console.log("Inserting categories");
          const category_name = (req.body.categoryName);

          const newCategory = await pool.query(`INSERT INTO categories (user_id, category_name, amount, date) VALUES (?, ?, ?)`, [users[0].id, category_name, expense,amount]);
          const values = [
           req.user.id,
           categoryName,
          ];

       //Logging categories in the console.
       console.log(categories);

       //Query to add new expenses values
       db.query(newCategory, values, (err, data) => {
        if (err) {
           console.error(err);
           return res.status(400).json("Something went wrong");
      }

        return res.status(200).json("Operation Successful.");
       });
     }

     } catch (error) {
         console.error('Error adding expense:', error);
         res.status(500).json({ error: 'An error occurred. Please try again.' });
     }
 });
 
app.get('/download-pdf', (req, res) => {
     // Create a new PDF document
     const doc = new PDFDocument();
   
     // Pipe the PDF into a file
     const filePath = path.join(__dirname, 'output.pdf');
     doc.pipe(fs.createWriteStream(filePath));
   
     // Add some content to the PDF
     doc.fontSize(12).text('Table Data', 100, 100);
   
     // Example table data
     const tableData = [
       ['Name', 'Age', 'Gender'],
       ['John Doe', '25', 'Male'],
       ['Jane Doe', '28', 'Female']
     ];
   
     // Add table to PDF
     let startY = 150;
     tableData.forEach(row => {
       let startX = 100;
       row.forEach(cell => {
         doc.text(cell, startX, startY);
         startX += 100;
       });
       startY += 20;
     });
   
     // Finalize the PDF and end the stream
     doc.end();
   
     // Wait for the PDF to be written to disk, then send it to the user
     doc.on('finish', () => {
       res.download(filePath, 'table.pdf', (err) => {
         if (err) {
           console.error('Error downloading file:', err);
           res.status(500).send('Error downloading file');
         } else {
           console.log('File downloaded successfully');
         }
       });
     });
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
