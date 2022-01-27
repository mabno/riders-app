import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppContext from './context';

import Header from './components/Header';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import OnlyLoggedIn from './containers/OnlyLoggedIn';
import OnlyLoggedOut from './containers/OnlyLoggedOut';

const router = [
	{path: '/', Component: Home, Container: OnlyLoggedIn},
	{path: '/register', Component: Register, Container: OnlyLoggedOut},
	{path: '/login', Component: Login, Container: OnlyLoggedOut}
]

const session = JSON.parse(localStorage.getItem('session')) || {token: null, id: null, name: null, surname: null, email: null};

const App = () => {

	const loginAction = ({token, id, name, surname, email}) => {
		setAppState({
			...appState,
			loggedin: true,
			token,
			id,
			name,
			surname,
			email
		});
		localStorage.setItem('session', JSON.stringify({token, id, name, surname, email}));
	}

	const logoutAction = () => {
		setAppState({
			...appState,
			loggedin: false,
			token: null,
			id: null,
			name: null,
			surname: null,
			email: null
		})
		localStorage.removeItem('session');
	}

	const [appState, setAppState] = useState({
		loggedin: session.id !== null,
		token: session.token,
		id: session.id,
		name: session.name,
		surname: session.surname,
		email: session.email,
		login: loginAction,
		logout: logoutAction
	});


	return(
		<AppContext.Provider value={appState}>
			<div className="min-h-screen flex flex-col bg-gray-200">
				<Router>
					<Header loggedin={appState.loggedin}/>
					<Routes>
						{
							router.map(e =>
								<Route key={e.path} exact path={e.path} element={
									<e.Container>
										<e.Component/>
									</e.Container>
								}/>
							)
						}
					</Routes>
				</Router>
			</div>
		</AppContext.Provider>
	)
}

export default App;