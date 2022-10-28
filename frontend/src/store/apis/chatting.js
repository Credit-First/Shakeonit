import { copyFileSync } from 'fs';
import axios from '../../@axios';
import { to_Decrypt } from '../../pages/client/aes';

export const getAllChattingHistories = (from_addr, to_addr, token_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_histories/${from_addr}/${to_addr}/${token_id}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				} else {
					reject(response.data);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getAcceptStatus = (contract_address) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_accepts/${contract_address}`)
			.then((response) => {
				if (response.status === 200 && response.data !== null) {
					resolve(response.data.flag);
				}
			})
			.catch((err) => {
				console.log("reject");
				reject(err);
			});
	});
};

export const getAllRequests = (contractAddress) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_all_requests/${contractAddress}`)
			.then((response) => {
				if (response) {
					resolve(response.data.length);
				} else {
					reject(response.data.length);
				}
			})
			.catch((err) => {
				console.log("reject");
				reject(err);
			});
	});
};

export const setAcceptStatusAllow = (contract_address, token_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/set_accepts/${contract_address}/${token_id}`)
			.then((response) => {
				const response_data = response.data;
				if (response.status === 200) {
					resolve(response_data);
				} else {
					reject(response_data);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getContactsForBuyer = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_contact_addresses`)
			.then((response) => {
				const response_data = response.data;
				if (response.status === 200) {
					resolve(response_data);
				} else {
					reject(response_data);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export const getMessages = (contract_address) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_chats/${contract_address}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				} else {
					reject(response.data);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getLastMessage = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_last_message`)
			.then((response) => {
				if (response.status === 200) {
					const lastMsgObj = response.data.reduce((obj, msg)=>{
						obj[msg._id] = to_Decrypt(msg.content)
						return obj
					}, {})
					resolve(lastMsgObj);
				} else {
					reject({});
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};