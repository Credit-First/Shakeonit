const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const cron = require('node-cron');
const connectDB = require('./config/db');
const {startMoralisServer} = require('./config/moralis');

dotenv.config();

const routesV1 = require('./routes/v1');
const socketController = require('./controllers/socket-controller');

const { PORT } = process.env || 5000;

const app = express();

app.use(express.static('public'));
app.use(cors({
	origin: '*',
	optionsSuccessStatus: 200,
	preflightContinue: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routesV1(app);

connectDB();

startMoralisServer();

const http = require('http').Server(app);
socketController.init(http);
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// cron.schedule('*/30 * * * *', async function () {
// });