const express = require('express');
const nftController = require('../../controllers/v1/nft-controller');

const router = express.Router();

router.get('/get_nfts/:address', nftController.getNfts);

module.exports = router;
