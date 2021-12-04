const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req,res) => {

  const account_num = req.body.account_num;

  query1 = "SELECT * FROM account";
  query1 += " WHERE account_num = ?";

  query2 = "SELECT * FROM bank_transaction";
  query2 += " WHERE account_num_fk = ?";

  db.query(query1, [account_num], function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }

    if (rows.length == 0) {
      res.status(404).json({"message": "account does't exist"});
    }
    else {
      db.query(query2, [account_num], function (err, rows) {
        if (err) {
          console.log(err);
          res.status(500).end();
        }
    
        if (rows.length == 0) {
          res.status(404).json({"message": "account doens't have any transactions"});
        }
        else {
          res.status(200).json(rows);
        }
      })
    }
  })
});

module.exports = router;