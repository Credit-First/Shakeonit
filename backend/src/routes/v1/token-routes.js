const express = require('express');
const tokenController = require('../../controllers/v1/token-controller');

const router = express.Router();

router.get('/get_tokens/:chainId/:address', tokenController.getTokens);
router.get('/tokenList', tokenController.tokenList);
router.get('/rateList', tokenController.rateList);
router.get('/tokenPathList', tokenController.tokenPathList);

module.exports = router;
