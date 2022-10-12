const express = require('express');
const tokenController = require('../../controllers/v1/token-controller');

const router = express.Router();

router.get('/get_tokens/:address', tokenController.getTokens);

module.exports = router;
