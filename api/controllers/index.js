const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const loginController = require('./login.js');
const accountsController = require('./accounts.js');
const transactionsController = require('./transactions.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
router.use('/login', loginController);
router.use('/accounts', accountsController);
router.use('/transactions', transactionsController);

module.exports = router;