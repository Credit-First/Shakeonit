const express = require('express');
const messageController = require('../../controllers/message-controller');

const router = express.Router();

router.get('/get_histories/:from_addr/:to_addr/:collection_id', messageController.getAllChattingHistories);
router.get('/get_accepts/:contract_address/:token_id', messageController.getAcceptStatus);
router.get('/get_all_requests/:contract_address', messageController.getAllRequests);
router.get('/set_accepts/:contract_address/:token_id', messageController.setAcceptStatusAllow);
router.get('/get_contacts/:address', messageController.getContacts);
router.get('/get_chats/:from_addr/:to_addr/:collection_id', messageController.getChats);

module.exports = router;
