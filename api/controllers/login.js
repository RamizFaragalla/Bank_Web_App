const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../models/db');

loginQueryPromise = (query, username, password) => {
  return new Promise((resolve, reject)=>{
    db.query(query, [username], function (err, rows) {
      if (err) {
        return reject(err);
      }
  
      return resolve(rows);
    });
  });
};

router.get('/', async (req,res) => {

  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  query1 = "SELECT * FROM security_info";
  query1 += " WHERE username = ?"

  query2 = "SELECT * FROM customer";
  query2 += " WHERE customer_id = ?";

  const rows = await loginQueryPromise(query1, username, password);

  try {
    if (rows.length == 0) {
      res.status(401).json({"message": "invalid username or password"});
    }
    else {
      if (await bcrypt.compare(password, rows[0].hashed_password)) {
        db.query(query2, [rows[0].customer_id_fk], function (err, rows) {
          if (err) {
            console.log(err);
            res.status(500).end();
          }
      
          res.status(200).json(rows[0]);
        })
      }
      else {
        res.status(401).json({"message": "invalid username or password"});
      }
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;