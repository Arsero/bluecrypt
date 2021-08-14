import React, { FunctionComponent, useState, useContext } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import useInput from '../../hooks/useInput';
import { UserContext } from '../../store/UserContext';
import IUser from '../../models/user';
import './styles.css';
import { checkStrongPassword } from '../../helpers/PasswordHelper';

const Register: FunctionComponent = () => {
	const email = useInput('');
	const password = useInput('');
	const [badPassword, setBadPassword] = useState(false);
	const { register } = useContext(UserContext);

	const handleSubmitForm = (event: any) => {
		event.preventDefault();
		if (
			email.value.length > 0 &&
			password.value.length > 0 &&
			checkStrongPassword(password.value)
		) {
			const user: IUser = {
				email: email.value,
				password: password.value,
			};

			register(user);
		} else {
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
					<FaUserPlus size={100} color='#00d1b2' />
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
							The email or the password can't be empty ! The
							password must contain at least 1 lowercase, 1
							uppercase, 1 numeric, 1 special character and be 10
							characters.
						</div>
					)}
				</div>
				<div style={{ textAlign: 'center' }}>
					<button
						className='button is-primary'
						style={{ width: '200px' }}
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
