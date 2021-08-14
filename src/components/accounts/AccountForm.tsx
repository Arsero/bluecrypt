import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IAccount from '../../models/account';
import { AccountContext } from '../../store/AccountContext';
import './styles.css';
import relocate from '../../helpers/RelocateHelper';
import { generatePassword } from '../../helpers/PasswordHelper';

const AccountForm: FunctionComponent = () => {
	const history = useHistory();
	const { selectedAccount, selectAccount, addAccount, updateAccount } =
		useContext(AccountContext);

	const initializeForm = () => {
		if (selectedAccount) return selectedAccount;
		else {
			return {
				id: '',
				website: '',
				email: '',
				username: '',
				password: '',
				comment: '',
			};
		}
	};

	const [account, setAccount] = useState<IAccount>(initializeForm);

	const handleCancel = (event: any) => {
		selectAccount(null);
		relocate(event, history, '/');
	};

	const handleGeneratePassword = () => {
		setAccount({
			...account,
			password: generatePassword(10),
		});
	};

	const handleSubmitForm = (event: any) => {
		if (selectedAccount) {
			updateAccount(account.id, account);
		} else {
			addAccount(account);
		}

		relocate(event, history, '/');
	};

	const handleInputChange = (event: any) => {
		const { name, value } = event.currentTarget;
		setAccount({ ...account, [name]: value });
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmitForm} className='box my-form'>
				<h3 className='title is-3'>
					{selectedAccount ? (
						<span>Edit an account</span>
					) : (
						<span>Create an account</span>
					)}
				</h3>
				<div className='field'>
					<div className='label'>Website</div>
					<div className='control'>
						<input
							className='input'
							type='text'
							name='website'
							placeholder='Enter a website'
							onChange={handleInputChange}
							value={account.website}
							required
						/>
					</div>
				</div>
				<div className='field'>
					<div className='label'>Email address</div>
					<div className='control'>
						<input
							className='input'
							type='email'
							name='email'
							placeholder='name@example.com'
							onChange={handleInputChange}
							value={account.email}
							required
						/>
					</div>
				</div>
				<div className='field'>
					<div className='label'>Username</div>
					<div className='control'>
						<input
							className='input'
							type='text'
							name='username'
							placeholder='Enter a username'
							onChange={handleInputChange}
							value={account.username}
							required
						/>
					</div>
				</div>
				<div className='field'>
					<div className='label'>Password</div>
					<div className='control'>
						<input
							className='input'
							type='password'
							name='password'
							placeholder='Enter a password'
							onChange={handleInputChange}
							value={account.password}
							required
						/>
					</div>
				</div>
				<div className='field' style={{ marginTop: '2rem' }}>
					<button
						onClick={handleGeneratePassword}
						type='button'
						className='button is-primary is-outlined my-button'
					>
						Generate Password
					</button>
				</div>

				<div className='columns'>
					<div className='column'>
						<button
							type='submit'
							className='button is-danger is-outlined my-button'
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
					<div className='column'>
						<button
							type='submit'
							className='button is-primary my-button'
						>
							{selectedAccount ? (
								<span>Save</span>
							) : (
								<span>Create</span>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AccountForm;
