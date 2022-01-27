import User from '../models/user';
import jwt from 'jsonwebtoken';
import env from '../env';
const {SECRET_JWT} = env;

export default async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});
	if(user){
		if(await user.comparePassword(password)){
			const token = jwt.sign({
				fullName: `${user.name} ${user.surname}`,
				email: user.email,
				id: user.id
			}, SECRET_JWT);

			res.json({
				message: 'Token generated sucessfully',
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				token
			})

		} else {
			res.status(400);
			res.json({
				message: `Password doesn't match`
			})
		}
	}else{
		res.status(400);
		res.json({
			message: `Email doesn't match`
		})
	}
}