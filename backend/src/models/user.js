import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	name: String,
	surname: String,
	email: String,
	password: String
});

userSchema.method('encryptPassword', async function(){
	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.method('comparePassword', async function(plainPassword){
	return await bcrypt.compare(plainPassword, this.password);
});


const User = model('User', userSchema);

export default User;