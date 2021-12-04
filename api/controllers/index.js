const express = require('express');
const router = express.Router();


// Load each controller
const appConfigController = require('./appConfig.js');
const loginController = require('./login.js');
const accountsController = require('./accounts.js');
const transactionsController = require('./transactions.js');
const moneyTransferController = require('./money_transfer.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/application-configuration', appConfigController);
router.use('/login', loginController);
router.use('/accounts', accountsController);
router.use('/transactions', transactionsController);
router.use('/money_transfer', moneyTransferController);

module.exports = router;