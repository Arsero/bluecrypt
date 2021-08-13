import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { AccountContext } from '../store/AccountContext';
import AccountList from '../components/accounts/AccountList';
import AccountForm from '../components/accounts/AccountForm';

const AuthenticatedApp: FunctionComponent = () => {
	const { accounts } = useContext(AccountContext);

	return (
		<div>
			<Route
				exact
				path='/'
				render={() => <AccountList accounts={accounts} />}
			/>
			<Route path={'/account'} render={() => <AccountForm />} />
		</div>
	);
};

export default AuthenticatedApp;
