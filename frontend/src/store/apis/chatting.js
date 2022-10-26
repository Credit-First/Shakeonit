import { copyFileSync } from 'fs';
import axios from '../../@axios';

export const getAllChattingHistories = (from_addr, to_addr, collection_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_histories/${from_addr}/${to_addr}/${collection_id}`)
			.then((response) => {
				if (response.status == 200) {
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

export const getAcceptStatus = (from_addr, to_addr, collection_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/get_accepts/${from_addr}/${to_addr}/${collection_id}`)
			.then((response) => {
				const response_data = response.data;
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

export const setAcceptStatusAllow = (from_addr, to_addr, collection_id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`api/v1/set_accepts/${from_addr}/${to_addr}/${collection_id}`)
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
