import { ipcRenderer, contextBridge } from 'electron';

const initIpcRenderer = () => {
	contextBridge.exposeInMainWorld('ipcMain', {
		writeDb: (content: string) => ipcRenderer.send('write-db', content),
		readDb: () => ipcRenderer.sendSync('read-db'),
		existDb: () => ipcRenderer.sendSync('exist-db'),
		updateKey: (email: string, password: string) =>
			ipcRenderer.sendSync('update-key', email, password),
	});
};

initIpcRenderer();
