import React from 'react';
import ContextConsumer from '../containers/ContextConsumer';

const LoggedInNavBar = ({context}) => {


	return(
		<ul className="flex gap-2 flex-col md:flex-row">
			<li className="px-4 py-2 flex items-center">
				<span className="mr-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 16 16">
  						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
					</svg>
				</span>
				<span>{context.name} {context.surname}</span>
			</li>
			<li>
				<button className={"px-4 py-2 rounded-sm transition-colors hover:bg-gray-700 block w-full text-left"} onClick={() => context.logout()}>Log out</button>
			</li>
		</ul>
	)
}

export default ContextConsumer(LoggedInNavBar);