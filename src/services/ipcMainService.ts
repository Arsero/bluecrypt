import { app, ipcMain } from 'electron';
import { db } from '../constants/constants';
import path from 'path';
import fs from 'fs';
import CryptHelper from '../helpers/CryptHelper';

const initIpcMain = (): void => {
	ipcMain.on('write-db', (event, arg) => {
		const pathname = path.join(app.getPath('userData'), db);

		const encryptedData = CryptHelper.encrypt(arg);
		fs.writeFile(pathname, encryptedData, (error) => {
			if (error) {
				console.log(error);
			}
		});
	});

	ipcMain.on('read-db', (event, arg) => {
		const pathname = path.join(app.getPath('userData'), db);
		const data = fs.readFileSync(pathname, 'utf-8');
		try {
			const decryptedData = CryptHelper.decrypt(data);
			event.returnValue = decryptedData;
		} catch (error) {
			event.returnValue = null;
		}
	});

	ipcMain.on('exist-db', (event, arg) => {
		const pathname = path.join(app.getPath('userData'), db);
		const isExist = fs.existsSync(pathname);

		event.returnValue = isExist;
	});

	ipcMain.on('update-key', (event, ...arg) => {
		CryptHelper.updateSecretKey(arg[0], arg[1]);
		event.returnValue = true;
	});
};

export default initIpcMain;
