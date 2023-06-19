const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const server = require('./server');
const authRoute = require('./app/auth/authroute');
const updateAccountRoute = require('./app/updateAccount/updateAccountRoute');
const categoriesRoute = require('./app/categories/categoriesRouter');
require('dotenv').config();
// const RoomRoute = require('./room/routes');
// const CustomRoomRoute = require('./customroom/routes');

// // const RoomInfoRoute = require('./room_info/routes');
// const userRoute = require('./users/routes');
// const messageRoute = require('./messages/routes');
// const dmsRoute = require('./dms/routes');
//const roomRoute = require('./room/routes');

const PORT = process.env.PORT || 8000;
//const PORT2 = process.env.PORT || 6000;
var cors = require('cors');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(cors());

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(express.static('public'));

// const connectString = 'mongodb+srv://rajeev:qwerasdf@cluster0.syoov.mongodb.net/ChatRoom?retryWrites=true&w=majority';

// const connectString2 =
// 	'mongodb+srv://youtube:e17pk2110064@cluster0.hslb9.mongodb.net/eventDB?retryWrites=true&w=majority';
// const connectString3 = 'mongodb+srv://chatapp:mnbvlkjh@cluster0.kkk1c2e.mongodb.net/chat?retryWrites=true&w=majority';

const connectString3 =
	'mongodb+srv://rajeevprakash2020:mnbvlkjh@cluster0.ffw5y2z.mongodb.net/ecommerce?retryWrites=true&w=majority';

const connectString4 =
	'mongodb://chatapp:mnbvlkjh@ac-2jmfs3u-shard-00-00.kkk1c2e.mongodb.net:27017,ac-2jmfs3u-shard-00-01.kkk1c2e.mongodb.net:27017,ac-2jmfs3u-shard-00-02.kkk1c2e.mongodb.net:27017/chat?ssl=true&replicaSet=atlas-1qq9mt-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose
	.connect(connectString3, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(async (con) => {
		//console.log(con.connections);
		console.log('DB connection successful');
	})
	.catch((err) => console.log('database connection error', err));

app.use(authRoute);
app.use(updateAccountRoute);
app.use(categoriesRoute);
// app.use(RoomRoute);
// app.use(userRoute);
// app.use(messageRoute);
// app.use(dmsRoute);
// app.use(CustomRoomRoute);

app.all('*', (req, res) => {
	console.log('req', req.originalUrl);

	const err = new Error('cant find this route');
	err.status = 'fail';
	err.statusCode = 410;

	res.status(404);
	res.send({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server`
	});
});

app.listen(PORT, () => {
	console.log('server listening on port = ', PORT);
});
