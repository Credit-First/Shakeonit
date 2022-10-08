import axios from '../../@axios';

export const getNfts = (address) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`/api/v1/get_nfts/${address}`)
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
