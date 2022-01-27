import React from 'react';
import { Link } from 'react-router-dom';


const LoggedOutNavBar = ({currentLink}) => {
	return(
		<ul className="flex gap-2 flex-col md:flex-row">
			<li>
				<Link className={"px-4 py-2 rounded-sm transition-colors hover:bg-gray-700 block "+currentLink('/register')} to="/register">Sign up</Link>
			</li>
			<li>
				<Link className={"px-4 py-2 rounded-sm transition-colors hover:bg-gray-700 block "+currentLink('/login')} to="/login">Sign in</Link>
			</li>
		</ul>
	)
}

export default LoggedOutNavBar;