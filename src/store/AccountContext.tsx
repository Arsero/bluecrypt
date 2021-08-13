import React, {
	createContext,
	FunctionComponent,
	useState,
	useContext,
} from 'react';
import IAccount from '../models/account';
import { v4 as uuid } from 'uuid';
import { DatabaseContext } from './DatabaseContext';

type AccountContextType = {
	accounts: IAccount[];
	initAccounts: (accounts: IAccount[]) => void;
	selectedAccount: IAccount;
	selectAccount: (account: IAccount) => void;
	addAccount: (account: IAccount) => void;
	updateAccount: (id: string, account: IAccount) => void;
	copyPassword: (id: string) => void;
	deleteAccount: (id: string) => void;
};

export const AccountContext = createContext<AccountContextType | null>(null);

const AccountProvider: FunctionComponent = ({ children }) => {
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(
		null
	);
	const { saveDatabase } = useContext(DatabaseContext);

	const selectAccount = (account: IAccount) => {
		setSelectedAccount(account);
	};

	const initAccounts = (accounts: IAccount[]) => {
		setAccounts(accounts);
	};

	const addAccount = (account: IAccount) => {
		const newAccount = { ...account, id: uuid() };
		const tempAccounts = [...accounts, newAccount];
		setAccounts(tempAccounts);

		saveDatabase(JSON.stringify(tempAccounts));
	};

	const updateAccount = (id: string, account: IAccount) => {
		const tempAccounts = accounts.filter((a) => a.id !== id);
		tempAccounts.push(account);
		setAccounts(tempAccounts);

		saveDatabase(JSON.stringify(tempAccounts));
	};

	const copyPassword = (id: string) => {
		const password = accounts.find((a) => a.id === id).password;
		if (password !== undefined) {
			navigator.clipboard.writeText(password);
		}
	};

	const deleteAccount = (id: string) => {
		const tempAccounts = accounts.filter((a) => a.id !== id);
		setAccounts(accounts.filter((a) => a.id !== id));
		saveDatabase(JSON.stringify(tempAccounts));
	};

	return (
		<AccountContext.Provider
			value={{
				accounts,
				initAccounts,
				selectedAccount,
				selectAccount,
				addAccount,
				updateAccount,
				copyPassword,
				deleteAccount,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};

export default AccountProvider;
