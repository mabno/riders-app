import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import socket from './socket';
import env from './env';
import router from './router';
const {PORT} = env;

import './database';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(router);

const server = http.Server(app);
server.listen(PORT, () => {
	console.log('Server running in port', PORT);
})

socket(server);
