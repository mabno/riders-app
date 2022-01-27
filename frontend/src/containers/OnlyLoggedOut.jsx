import React from 'react';
import { Navigate } from 'react-router-dom';
import ContextConsumer from '../containers/ContextConsumer';

const OnlyLoggedOut = ({context, children}) => {
	if(!context.loggedin){
		return children;
	}
	return <Navigate to="/"/>
}

export default ContextConsumer(OnlyLoggedOut);