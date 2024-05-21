const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });



exports.register = async (req, res) =>{
    console.log(req.body);



    const { username, email, password } = req.body;

    db.query('SELECT email FROM coffee WHERE email = ?', [email], async (error, results) =>{
        if(error){
          console.log(error);
        }
        if(results.length > 0){
          return res.render('login', {
          message: 'That email has been taken'
          })
        }

        let hashedPassword = bcrypt.hashSync(password, 8);
        console.log(hashedPassword);


        db.query('INSERT INTO coffee SET ?', {username: username, email: email, password: hashedPassword}, (error, results) =>{
          if(error){
            console.log(error);
          }else{
            console.log(results);
            return res.render('login', {
            message: 'User registered successfully'
            });
            

          }
        })

    });

}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      });
    }

    const query = 'SELECT * FROM coffee WHERE email = ?';
    const userData = await new Promise((resolve, reject) => {
      db.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!userData) {
      return res.status(401).render('login', {
        message: 'Email or Password is incorrect'
      });
    }

    const hashedPassword = userData.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 /* 1 hour */ });
      res.status(200).redirect("/");
    } else {
      res.status(401).render('login', {
        message: 'Email or Password is incorrect'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}






