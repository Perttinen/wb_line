import userService from '../services/users'
import { useState, useEffect } from 'react'

export const UserList = () => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		userService.getAll().then((initialUsers) => {
			setUsers(initialUsers)
		})
	}, [])

	return (
		<div>
			<p>users</p>
			<p>{!users ? 'Loading...' : users[0].name}</p>
		</div>
	)
}
