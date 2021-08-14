import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPencilAlt, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import IAccount from '../../models/account';
import { AccountContext } from '../../store/AccountContext';
import relocate from '../../helpers/RelocateHelper';
import './styles.css';

interface IProps {
	accounts: IAccount[];
}

const AccountList: FunctionComponent<IProps> = ({ accounts }) => {
	const { copyPassword, deleteAccount, selectAccount } =
		useContext(AccountContext);
	const history = useHistory();

	const handleCopy = (id: string) => (event: any) => {
		copyPassword(id);
	};

	const handleAdd = () => {
		selectAccount(null);
		relocate(event, history, '/account');
	};

	const handleEdit = (account: IAccount) => (event: any) => {
		selectAccount(account);
		relocate(event, history, '/account');
	};

	const handleDelete = (id: string) => (event: any) => {
		deleteAccount(id);
	};

	return (
		<div className='container'>
			<div className='box my-table'>
				<div className='scroll-table'>
					<table className='table is-fullwidth is-hoverable is-striped'>
						<thead>
							<tr>
								<th>Website</th>
								<th>Email address</th>
								<th>Username</th>
								<th style={{ textAlign: 'center' }}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{accounts
								.sort((a: IAccount, b: IAccount) =>
									a.website < b.website ? -1 : 1
								)
								.map((account: IAccount) => (
									<tr key={account.id}>
										<td>{account.website}</td>
										<td>{account.email}</td>
										<td>{account.username}</td>
										<td
											style={{
												textAlign: 'center',
											}}
										>
											<span
												className='icon my-icon'
												title='Copy'
												onClick={handleCopy(account.id)}
											>
												<FaCopy
													size={20}
													color='#00d1b2'
												/>
											</span>
											<span
												className='icon my-icon'
												title='Edit'
												onClick={handleEdit(account)}
											>
												<FaPencilAlt
													className='fas'
													size={20}
													color='#00d1b2'
												/>
											</span>
											<span
												className='icon my-icon'
												title='Delete'
												onClick={handleDelete(
													account.id
												)}
											>
												<FaTrashAlt
													size={20}
													color='#f14668'
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>

					<a title='Add' className='add-button' onClick={handleAdd}>
						<AiFillPlusCircle color='#00d1b2' size={46} />
					</a>
				</div>
			</div>
		</div>
	);
};

export default AccountList;
