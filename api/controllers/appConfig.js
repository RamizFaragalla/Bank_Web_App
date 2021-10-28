const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'Bank Web App',
    description: 'A short description about this app',
  });
});


module.exports = router;