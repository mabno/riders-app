import mongoose from 'mongoose';
import env from './env';
const {MONGODB_URI} = env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', () => {
	console.log('Database connection error')
});
db.on('open', () => {
	console.log('Database connected')
});