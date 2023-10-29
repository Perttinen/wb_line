import { useState, useEffect } from 'react'

import userService from '../services/users'

export const UserList = ({ delbutton }) => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		userService.getAll().then((initialUsers) => {
			setUsers(initialUsers)
		})
	}, [])

	const removeUser = (id) => {
		userService.remove(id)
		setUsers(users.filter((u) => u.id !== id))
	}

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
									<button onClick={() => removeUser(u.id)}>delete</button>
								) : null}
							</li>
						))}
					</ul>
				)}
			</h4>
		</div>
	)
}
