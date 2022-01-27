import {io} from 'socket.io-client';
let socket = null;

export const connectSocket = (token) => {
	socket = io('http://localhost:3001',
	{
		auth: {token},
		transports: ['websocket'],
		upgrade: false
	}
	);
}

export const onInitialSchema = (cb) => {
	if (!socket) return;
	socket.on('initialSchema', data => {
		cb(data)
	})
}

export const onRiderRequested = (cb) => {
	if (!socket) return;
	socket.on('request', data => {
		cb(data)
	})
}

export const onRiderCanceled = (cb) => {
	if (!socket) return;
	socket.on('cancel', data => {
		cb(data)
	})
}

export const emitRequest = (data) => {
	if (!socket) return;
	socket.emit('request', data)
}

export const emitCancel = (data) => {
	if (!socket) return;
	socket.emit('cancel', data)
}