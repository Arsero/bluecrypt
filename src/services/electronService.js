export const saveDb = (content) => window.ipcMain.writeDb(content);
export const readDb = () => window.ipcMain.readDb();
export const existDb = () => window.ipcMain.existDb();
export const updateKey = (email, password) =>
	window.ipcMain.updateKey(email, password);
