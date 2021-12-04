const express = require('express');
const router = express.Router();
const db = require('../models/db');
const moment = require('moment');

router.post('/', async (req,res) => {

  const sender_account_num = req.body.sender_account_num;
  const recipient_account_num = req.body.recipient_account_num;
  const description = req.body.description.trim();
  let amount = parseFloat(req.body.amount);

  if (isNaN(amount)) {
    res.status(400).json({"message": "invalid value for amount."});
    return;
  }

  let output = "Success!\nBefore money_transfer:\n";

  if (sender_account_num == recipient_account_num) {
    res.status(400).json({"message": "the sender and recipient account numbers are the same."});
    return;
  }
  
  if (amount <= 0) {
    res.status(400).json({"message": "invalid value for amount."});
    return;
  }

  if (!description || typeof description == 'undefined') {
    res.status(400).json({"message": "please enter a description."});
    return;
  }
  
  query1 = "SELECT * FROM account WHERE account_num = ? OR account_num = ?";
  db.query(query1, [sender_account_num, recipient_account_num], function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).end();
      return;
    }

    else if (rows.length != 2) {
      res.status(400).json({"message": "invalid sender and/or recipient account number(s)."});
      return;
    }

    else {
      let sender_balance, recipient_balance; 
      
      if (rows[0]["account_num"] == sender_account_num) {
        sender_balance = rows[0]["balance"];
        recipient_balance = rows[1]["balance"];
      }
      else {
        sender_balance = rows[1]["balance"];
        recipient_balance = rows[0]["balance"];
      }
      
      output += "sender_balance: " + sender_balance + "\n";
      output += "recipient_balance: " + recipient_balance + "\n";

      sender_balance -= amount;

      if (sender_balance < 0) {
        res.status(400).json({"message": "insufficient balance"});
        return;
      }
      else {
        recipient_balance += amount;

        query2 = "UPDATE account SET balance = ? WHERE account_num = ?";
        db.query(query2, [sender_balance, sender_account_num], function (err, rows) {
          if (err) {
            console.log(err);
            res.status(500).end();
            return;
          }

          query3 = "UPDATE account SET balance = ? WHERE account_num = ?";
          db.query(query3, [recipient_balance, recipient_account_num], function (err, rows) {
            if (err) {
              console.log(err);
              res.status(500).end();
              return;
            }

            query4 = "SELECT * FROM account WHERE account_num = ? OR account_num = ?";
            db.query(query4, [sender_account_num, recipient_account_num], function (err, rows) {
              if (err) {
                console.log(err);
                res.status(500).end();
                return;
              }

              if (rows[0]["account_num"] == sender_account_num) {
                sender_balance = rows[0]["balance"];
                recipient_balance = rows[1]["balance"];
              }
              else {
                sender_balance = rows[1]["balance"];
                recipient_balance = rows[0]["balance"];
              }

              output += "After money_transfer:\n";
              output += "sender_balance: " + sender_balance + "\n";
              output += "recipient_balance: " + recipient_balance;

              // save the transfer info to the table "money_transfer" in db
              query5 = "INSERT INTO money_transfer (sender_account_num_fk, recipient_account_num_fk, amount, description, transfer_date)"
              query5 += " VALUE (?, ?, ?, ?, ?)";
              date_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
              db.query(query5, [sender_account_num, recipient_account_num, amount, description, date_time], function (err, rows) {
                if (err) {
                  console.log(err);
                  res.status(500).end();
                  return;
                }

                res.status(200).json({"message": "money transfer is successful", "data": + "" + output});
                return;
              })
            })
          })
        })
      }

    }
  })
});

router.get('/:account_num', async (req,res) => {
  const { account_num } = req.params;
  
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