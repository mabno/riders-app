import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import LoggedInNavbar from './LoggedInNavbar';
import LoggedOutNavbar from './LoggedOutNavbar';

const Header = ({loggedin}) => {
	const location = useLocation().pathname;
	const [showNav, setShowNav] = useState(false);
	const headerRef = useRef(0);

	const currentLink = (path) => {
		if(location === path){
			return 'bg-gray-700';
		}
		return '';
	}

	const onBlur = (e) => {
		if(!headerRef.current.contains(e.target)){
			setShowNav(false);
		}
	}

	useEffect(() => {
		window.addEventListener('click', onBlur);
		return () => {
			window.removeEventListener('click', onBlur);
		}
	}, [])

	return(
		<header className="bg-gray-800 text-white py-4 relative shadow" ref={headerRef}>
			<div className="container mx-auto px-2 flex justify-between items-center">
				<h1 className="font-bold text-xl">Riders App</h1>
				<button className="md:hidden focus:outline-none" onClick={() => setShowNav(!showNav)}>
					<svg xmlns="bg-white" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
  						<path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</button>
				<nav className={"bg-gray-800 absolute top-full inset-x-0 p-2 md:p-0 md:block md:static" + (!showNav ? ' hidden' : '')}>
					{
						loggedin ? <LoggedInNavbar/> : <LoggedOutNavbar currentLink={currentLink}/>
					}
				</nav>
			</div>
		</header>
	)
}

export default Header;