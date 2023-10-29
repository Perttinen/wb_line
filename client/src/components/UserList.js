import { useState, useEffect } from 'react'

import userService from '../services/users'

export const UserList = () => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		userService.getAll().then((initialUsers) => {
			setUsers(initialUsers)
		})
	}, [])

	const removeUser = (id) => {
		userService.remove(id)
	}

	return (
		<div>
			<h3>Current users from db:</h3>

			<h4>
				{!users ? (
					'Loading...'
				) : (
					// users[0].name
					<ul>
						{users.map((u) => (
							<li key={u.id}>
								{u.name}{' '}
								<button onClick={() => removeUser(u.id)}>delete</button>
							</li>
						))}
					</ul>
				)}
			</h4>
		</div>
	)
}
