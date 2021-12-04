const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req,res) => {
    const account_num = req.body.account_num;
    
    query = "SELECT mt.transfer_date, mt.description, mt.amount,";
    query += " mt.sender_account_num_fk AS sender_account_num, sender_account.account_type AS sender_account_type, sender_customer.first_name AS sender_first_name, sender_customer.last_name AS sender_last_name,";
    query += " mt.recipient_account_num_fk AS recipient_account_num, recipient_account.account_type AS recipient_account_type, recipient_customer.first_name AS recipient_first_name, recipient_customer.last_name AS recipient_last_name";
    query += " FROM money_transfer AS mt, account AS sender_account, account AS recipient_account, customer AS sender_customer, customer AS recipient_customer";
    query += " WHERE sender_account.account_num = mt.sender_account_num_fk AND sender_customer.customer_id = sender_account.customer_id_fk";
    query += " AND recipient_account.account_num = mt.recipient_account_num_fk AND recipient_customer.customer_id = recipient_account.customer_id_fk";
    query += " AND (mt.sender_account_num_fk = ? OR mt.recipient_account_num_fk = ?)";
    query += " ORDER BY mt.transfer_date DESC";
  
    db.query(query, [account_num, account_num], function (err, rows) {
      if (err) {
        console.log(err);
        res.status(500).end();
        return;
      }
  
      if (rows.length == 0) {
        res.status(200).json({"message": "no money transfer history"});
        return;
      }
  
      res.status(200).json(rows);
    });
  
});

module.exports = router;