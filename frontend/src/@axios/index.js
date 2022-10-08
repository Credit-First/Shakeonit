import Axios from 'axios';
import Config from '../config/app';

const axios = Axios.create({
	responseType: 'json',
	baseURL: Config.server_url,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

axios.interceptors.response.use(function (res) {
	return res;
});

export default axios;
