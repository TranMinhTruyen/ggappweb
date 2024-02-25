import ErrorFallback from 'common/ErrorFallback';
import { getAuth } from 'common/sevices/auth/authAction';
import React from 'react';
import RouterList from './common/RouterList';

const App = () => {
	getAuth();
	return (
		<ErrorFallback>
			<RouterList/>
		</ErrorFallback>
	);
}

export default App;
