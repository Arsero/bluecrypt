import React, { FunctionComponent, useContext, useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import IUser from '../../models/user';
import useInput from '../../hooks/useInput';
import { UserContext } from '../../store/UserContext';
import './styles.css';

const Login: FunctionComponent = () => {
	const email = useInput('');
	const password = useInput('');
	const [badPassword, setBadPassword] = useState(false);
	const { login } = useContext(UserContext);

	const handleSubmitForm = (event: any) => {
		event.preventDefault();

		const user: IUser = {
			email: email.value,
			password: password.value,
		};

		if (!login(user)) {
			setBadPassword(true);
		}
	};

	const handleCloseBadPassword = () => {
		setBadPassword(false);
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmitForm} className='box my-form'>
				<div className='logo' style={{ textAlign: 'center' }}>
					<FaUserSecret size={100} color='#00d1b2' />
				</div>
				<div className='field'>
					<div className='label'>Email address</div>
					<div className='control'>
						<input
							className='input'
							type='email'
							placeholder='e.g. blue@example.com'
							{...email}
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
							placeholder='**********'
							{...password}
							required
						/>
					</div>
					{badPassword && (
						<div
							className='notification is-danger'
							style={{ marginTop: '1rem', marginBottom: '-2rem' }}
						>
							<button
								className='delete'
								onClick={handleCloseBadPassword}
							></button>
							The email or the password is incorrect !
						</div>
					)}
				</div>
				<div style={{ textAlign: 'center' }}>
					<button
						className='button is-primary'
						style={{ width: '200px' }}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
