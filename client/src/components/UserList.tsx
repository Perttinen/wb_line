import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeUser } from '../reducers/userReducer'
import { User } from '../types'
import { AppDispatch } from '../store'

type Props = {
	delbutton: boolean
}

export const UserList: React.FC<Props> = ({ delbutton }) => {
	const users = useSelector((state: { users: User[] }) => state.users)
	const dispatch: (...args: unknown[]) => Promise<User> =
		useDispatch<AppDispatch>()

	return (
		<div>
			<h3>Current users from db:</h3>

			<h4>
				{!users ? (
					'Loading...'
				) : (
					<ul>
						{users.map((u) => (
							<li key={u.id}>
								{u.name}{' '}
								{delbutton === true ? (
									<button onClick={() => dispatch(removeUser(u.id))}>
										delete
									</button>
								) : null}
							</li>
						))}
					</ul>
				)}
			</h4>
		</div>
	)
}
