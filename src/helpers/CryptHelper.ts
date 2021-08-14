import crypto from 'crypto';

export default class CryptHelper {
	static algorithm = 'aes-256-ctr';
	static secretKey: Buffer = undefined;

	static updateSecretKey = (email: string, password: string) => {
		CryptHelper.secretKey = crypto
			.createHash('sha256')
			.update(password)
			.update(email)
			.digest();
	};

	static encrypt = (text: string) => {
		const iv = crypto.randomBytes(16);

		const cipher = crypto.createCipheriv(
			CryptHelper.algorithm,
			CryptHelper.secretKey,
			iv
		);

		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
		return Buffer.concat([iv, encrypted]).toString('hex');
	};

	static decrypt = (hash: string) => {
		const decipher = crypto.createDecipheriv(
			CryptHelper.algorithm,
			CryptHelper.secretKey,
			Buffer.from(hash.slice(0, 32), 'hex')
		);

		const decrypted = Buffer.concat([
			decipher.update(Buffer.from(hash.slice(32), 'hex')),
			decipher.final(),
		]);

		return decrypted.toString();
	};
}
