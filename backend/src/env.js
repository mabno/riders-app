export default {
	PORT: process.env.PORT || 3001,
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/riders',
	SECRET_JWT: process.env.SECRET_JWT || 'secret'
}