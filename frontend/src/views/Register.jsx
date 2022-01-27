import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { register, login } from '../fetching';
import ContextConsumer from '../containers/ContextConsumer';

import Input from '../components/Input';
const emailRegExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

const Register = ({context}) => {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		name: false,
		surname: false,
		email: false,
		password: false,
		rpassword: false
	})

	const formHandler = async (e) => {
		e.preventDefault();
		const t = e.target;
		const [name, surname, email, password, rpassword] = [t.name.value, t.surname.value, t.email.value, t.password.value, t.rpassword.value];
		let nameError, surnameError, emailError, passwordError, rpasswordError;

		if(name.length === 0){
			nameError = `Complete this field`;

		}
		if(surname.length === 0){
			surnameError = `Complete this field`;

		}
		if(!emailRegExp.test(email)){
			emailError =  `Complete this field`;

		}
		if(password.length < 8){
			passwordError = `Password must have at least 8 characters`;

		}
		if(password !== rpassword){
			rpasswordError =  `Passwords don't match`;

		}

		if(nameError || surnameError || emailError || passwordError || rpasswordError) {
			setError({
				name: nameError,
				surname: surnameError,
				email: emailError,
				password: passwordError,
				rpassword: rpasswordError,
				global: false
			})
			return;
		}

		setLoading(true);

		const registerResponse = await register({name, surname, email, password});

		if(registerResponse.message === 'Email is already in use'){
			setError({...error, email: registerResponse.message})
			setLoading(false);
			return;
		}

		const loginResponse = await login({email, password});
		setLoading(false);
		context.login({
			id: loginResponse.id,
			name: loginResponse.name,
			surname: loginResponse.surname,
			email: loginResponse.email,
			token: loginResponse.token,
			loggedin: true
		})
	}

	return (
		<main className="flex-grow flex flex-col">
			<div className="container mx-auto py-4 px-2 flex justify-center items-center flex-grow">
				<form
					className="bg-white w-full p-6 flex flex-col gap-3 max-w-full shadow md:w-3/4 lg:w-2/4"
					noValidate
					onSubmit={(e) => formHandler(e)}
				>
					<h1 className="text-center text-xl font-bold mb-3">Sign up</h1>
					<div className="flex flex-col gap-3 md:flex-row">
						<Input
							label="Name"
							type="text"
							name="name"
							placeholder="John"
							error={error.name}
						/>
						<Input
							label="Surname"
							type="text"
							name="surname"
							placeholder="Doe"
							error={error.surname}
						/>
					</div>
					<Input
						label="E-Mail"
						type="email"
						name="email"
						placeholder="johndoe@gmail.com"
						error={error.email}
					/>
					<Input
						label="Password"
						type="password"
						name="password"
						placeholder="Must have at least 8 characters"
						error={error.password}
					/>
					<Input
						label="Repeat password"
						type="password"
						name="rpassword"
						error={error.rpassword}
					/>
					<div className="flex justify-between items-baseline gap-3 text-gray-400">
						<div>Already have account? <Link className="text-blue-600" to="/login">Sign in</Link></div>
						<button className="text-white rounded-sm bg-blue-600 w-24 px-auto py-2 focus:outline-none">
							{ loading ?
								<svg className="mx-auto animate-spin stroke-current text-white" width="22px" height="22px" viewBox="0 0 100 100">
									<circle cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138"/>
								</svg>
								: 'Sign up'
							}
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}


export default ContextConsumer(Register);
