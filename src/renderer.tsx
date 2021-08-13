import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import UserProvider from './store/UserContext';
import AccountProvider from './store/AccountContext';
import DatabaseProvider from './store/DatabaseContext';
import 'bulma/css/bulma.min.css';
import './index.css';

ReactDOM.render(
	<HashRouter>
		<DatabaseProvider>
			<AccountProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</AccountProvider>
		</DatabaseProvider>
	</HashRouter>,
	document.getElementById('root')
);
