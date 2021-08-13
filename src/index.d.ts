declare interface Window {
	ipcMain: {
		writeDb(data: string): void;
		readDb(): any;
		existDb(): any;
		updateKey(email: string, password: string): any;
	};
}
declare module '*.png' {
	const value: any;
	export = value;
}
