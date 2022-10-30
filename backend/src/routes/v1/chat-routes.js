const express = require('express');
const messageController = require('../../controllers/message-controller');

const router = express.Router();

router.get('/get_histories/:from_addr/:to_addr/:collection_id', messageController.getAllChattingHistories);
router.get('/get_accepts/:contract_address/:from_address', messageController.getAcceptStatus);
router.get('/get_all_requests/:contract_address', messageController.getAllRequests);
router.get('/set_accepts/:contract_address/:from_address/:accepter', messageController.setAcceptStatusAllow);
router.get('/get_contacts/:address', messageController.getContacts);
router.get('/get_last_message/:from_address', messageController.getLastMessage);
// router.get('/get_chats/:from_addr/:to_addr/:collection_id', messageController.getChats);
router.get('/get_chats/:to_addr/:seller_addr/:buyer_addr', messageController.getChats);
router.get('/get_contact_addresses', messageController.getContactAddresses);
router.get('/get_buyers_by_contract/:to_addr', messageController.getBuyersByContract);

module.exports = router;
