import React from 'react';
import AppContext from '../context';

const ContextConsumer = (Component) => (props) => (
	<AppContext.Consumer>
		{data => <Component context={data} {...props}/>}
	</AppContext.Consumer>
)

export default ContextConsumer