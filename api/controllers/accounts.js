const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/:customer_id', async (req,res) => {

  const { customer_id } = req.params;

  query1 = "SELECT * FROM customer";
  query1 += " WHERE customer_id = ?";

  query2 = "SELECT * FROM account";
  query2 += " WHERE customer_id_fk = ?";

  db.query(query1, [customer_id], function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }

    if (rows.length == 0) {
      res.status(404).json({"message": "user does't exist"});
    }
    else {
      db.query(query2, [customer_id], function (err, rows) {
        if (err) {
          console.log(err);
          res.status(500).end();
        }
    
        if (rows.length == 0) {
          res.status(404).json({"message": "user doens't have any bank accounts"});
        }
        else {
          res.status(200).json(rows);
        }
      })
    }
  })
});

module.exports = router;