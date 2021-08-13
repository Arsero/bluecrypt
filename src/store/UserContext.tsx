import React, {
	createContext,
	FunctionComponent,
	useContext,
	useState,
} from 'react';
import IUser from '../models/user';
import { AccountContext } from './AccountContext';
import { DatabaseContext } from './DatabaseContext';

type UserContextType = {
	auth: boolean;
	login: (user: IUser) => boolean;
	logout: () => void;
	register: (user: IUser) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: FunctionComponent = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const { updatePartialKey, readDatabase, saveDatabase } =
		useContext(DatabaseContext);
	const { initAccounts } = useContext(AccountContext);

	const login = (user: IUser) => {
		try {
			updatePartialKey(user.email, user.password);
			const accounts = readDatabase();
			if (accounts) {
				initAccounts(accounts);
			} else {
				initAccounts([]);
			}

			setAuth(true);

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const logout = () => {
		initAccounts([]);
		setAuth(false);
	};

	const register = (user: IUser) => {
		updatePartialKey(user.email, user.password);
		initAccounts([]);

		saveDatabase(JSON.stringify([]));
		setAuth(true);
	};

	return (
		<UserContext.Provider value={{ auth, login, logout, register }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
