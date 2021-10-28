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

  query = "SELECT * FROM security_info";
  query += " WHERE username = ?"

  const rows = await loginQueryPromise(query, username, password);

  try {
    if (rows.length == 0) {
      res.status(401).json({"message": "invalid username or password"});
    }
    else {
      if (await bcrypt.compare(password, rows[0].hashed_password)) {
        res.status(200).json({"customer_id": rows[0].customer_id_fk});
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