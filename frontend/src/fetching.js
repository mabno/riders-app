const FETCH_URI = 'http://localhost:3001';

const register = async (body) => {
	const promise = await fetch(`${FETCH_URI}/api/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	const res = await promise.json();
	return res;
}

const login = async (body) => {
	const promise = await fetch(`${FETCH_URI}/api/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	const res = await promise.json();
	return res;
}

export {register, login};