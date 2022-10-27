import { copyFileSync } from 'fs';
import axios from '../../@axios';

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

export const getAcceptStatus = (contract_address, token_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_accepts/${contract_address}/${token_id}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data.flag);
				} else {
					reject(response.data.flag);
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
