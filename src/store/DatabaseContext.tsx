import React, {
	createContext,
	FunctionComponent,
	useEffect,
	useState,
} from 'react';
import IAccount from '../models/account';
import {
	saveDb,
	readDb,
	existDb,
	updateKey,
} from '../services/electronService';

type DatabaseContextType = {
	updatePartialKey: (email: string, password: string) => void;
	readDatabase: () => IAccount[];
	saveDatabase: (content: string) => void;
	isDatabaseExist: boolean;
};

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

const DatabaseProvider: FunctionComponent = ({ children }) => {
	const [isDatabaseExist, setIsDatabaseExist] = useState(false);

	useEffect(() => {
		setIsDatabaseExist(existDb());
	}, []);

	const updatePartialKey = (email: string, password: string) => {
		updateKey(email, password);
	};

	const readDatabase = (): IAccount[] => {
		if (existDb()) {
			const data = readDb();

			return JSON.parse(data);
		}
		return undefined;
	};

	const saveDatabase = (content: string) => {
		saveDb(content);
	};

	return (
		<DatabaseContext.Provider
			value={{
				updatePartialKey,
				readDatabase,
				saveDatabase,
				isDatabaseExist,
			}}
		>
			{children}
		</DatabaseContext.Provider>
	);
};

export default DatabaseProvider;
