import socketio from 'socket.io';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import env from './env';
const {SECRET_JWT} = env;


const schema = [];
const MIN_INTERVAL = 30;
const START_AT = 8;
const END_AT = 20;


const makeSchema = () => {
	let i = 0;
	let time = 0;;
	let end = (1000*60*60*END_AT);
	let start = (1000*60*60*START_AT);
	while(time < end){
		time = start + (1000*60*MIN_INTERVAL*i);
		schema.push({
			time,
			riders: {}
		})
		i++;
	}
};

makeSchema();

export default (server) => {
	const io = socketio(server);

	io.use((socket, next) => {
  		const token = socket.handshake.auth.token;
  		jwt.verify(token, SECRET_JWT, function(err, decoded){
  			if(err){
  				console.log('Auth error')
  				next(err)
  			}
  			console.log('Auth successfully')
  			next()
  		})

	});
	io.on('connection', (socket) => {
		console.log(socket.id, 'connected');
		socket.emit('initialSchema', {schema});

		socket.on('request', (data) => {
			const {schemaIndex, userID, userName} = data
			const riderID = uuidv4()
			schema[schemaIndex].riders[riderID] = {id: userID, name: userName};
			io.emit('request', {schemaIndex, riderID, userID, userName});
		})

		socket.on('cancel', (data) => {
			const {schemaIndex, riderID} = data

			delete schema[schemaIndex].riders[riderID]

			io.emit('cancel', {schemaIndex, riderID});
		})

		socket.on('disconnect', () => {
			socket.removeAllListeners();
			console.log('user disconnected');
		});
	})

}