import React, { FunctionComponent, useContext } from 'react';
import { DatabaseContext } from '../store/DatabaseContext';
import Login from './Login/Login';
import Register from './Login/Register';

const UnauthenticatedApp: FunctionComponent = () => {
	const { isDatabaseExist } = useContext(DatabaseContext);

	return isDatabaseExist ? <Login /> : <Register />;
};

export default UnauthenticatedApp;
