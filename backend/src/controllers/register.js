import User from '../models/user';
const emailRegExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

export default async (req, res) => {
	const {name, surname, email, password} = req.body;
	// Body validation
	if(!name || typeof name !== 'string' ){
		res.status(400);
		return res.json({
			message: `Name field isn't valid`
		})
	}
	if(!surname || typeof surname !== 'string' ){
		res.status(400);
		return res.json({
			message: `Surname field isn't valid`
		})
	}
	if(!email || typeof email !== 'string'  || !emailRegExp.test(email)){
		res.status(400);
		return res.json({
			message: `Email field isn't valid`
		})
	}
	if(!password || typeof password !== 'string' || password.length < 8){
		res.status(400);
		return res.json({
			message: `Password field isn't valid`
		})
	}

	const emailAlreadyExists = await User.findOne({email});
	if(emailAlreadyExists){
		res.status(400);
		return res.json({
			message: `Email is already in use`
		})
	}

	try{
		const user = await new User({name, surname, email, password})
		await user.encryptPassword();
		user.save();
	} catch (err) {
		console.log(err)
	}
	res.json({
		message: 'User registered successfully'
	})
}