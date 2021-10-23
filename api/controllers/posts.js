const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req,res) => {
  // Post.findAll({})
  //   .then(posts => res.json(posts));
  const query = "SELECT * FROM customer";

  db.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }

    console.log(rows[0]["customer_name"]);
    res.status(200).end();
  })
});

module.exports = router;