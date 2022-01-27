import {createContext} from 'react';
export default createContext({
	token: null,
	loggedin: false,
	id: null,
	name: null,
	surname: null,
	email: null,
	login: () => {},
	logout: () => {}
})