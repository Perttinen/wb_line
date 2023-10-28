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
			<h3>Current users from db:</h3>
			<h4>{!users ? 'Loading...' : users[0].name}</h4>
		</div>
	)
}
