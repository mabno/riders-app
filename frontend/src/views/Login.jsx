import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { login } from '../fetching';
import ContextConsumer from '../containers/ContextConsumer';

import Input from '../components/Input';

const Login = ({context}) => {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		email: false,
		password: false
	})

	const formHandler = async (e) => {
		e.preventDefault();
		const t = e.target;
		const [email, password] = [t.email.value, t.password.value];

		setLoading(true);

		const loginResponse = await login({email, password});

		if(loginResponse.message === `Email doesn't match`){
			setError({email: loginResponse.message, password: false})
			setLoading(false);
			return;
		}
		if(loginResponse.message === `Password doesn't match`){
			setError({email: false, password: loginResponse.message})
			setLoading(false);
			return;
		}

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
					<h1 className="text-center text-xl font-bold mb-3">Sign in</h1>
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
					<div className="flex justify-between items-center gap-3 text-gray-400">
						<div>Don't have account? <Link className="text-blue-600" to="/register">Sign up</Link></div>
						<button className="text-white rounded-sm bg-blue-600 h-10 w-24  focus:outline-none">
							{ loading ?
								<svg className="mx-auto animate-spin stroke-current text-white" width="22px" height="22px" viewBox="0 0 100 100">
									<circle cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138"/>
								</svg>
								: 'Sign in'
							}
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}


export default ContextConsumer(Login);
