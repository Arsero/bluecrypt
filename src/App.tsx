import React, { FunctionComponent, useContext } from 'react';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';
import { UserContext } from './store/UserContext';

const App: FunctionComponent = () => {
	const { auth } = useContext(UserContext);

	return auth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
