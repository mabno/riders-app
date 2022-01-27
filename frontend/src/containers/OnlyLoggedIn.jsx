import React from 'react';
import { Navigate } from 'react-router-dom';
import ContextConsumer from '../containers/ContextConsumer';

const OnlyLoggedIn = ({context, children}) => {
	if(!context.loggedin){
		return <Navigate to="/login"/>
	}
	return children;
}

export default ContextConsumer(OnlyLoggedIn);