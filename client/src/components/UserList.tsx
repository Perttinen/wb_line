import { useSelector, useDispatch } from 'react-redux'

import { removeUser } from '../reducers/userReducer'
import { User } from '../../../types'
import { AppDispatch } from '../store'
import { WebSocketContext } from '../WebSocket'
import { useContext } from 'react'

export const UserList = ({ delbutton }: { delbutton: boolean }) => {
	const users = useSelector((state: { users: User[] }) => state.users)
	const dispatch: (...args: unknown[]) => Promise<User> =
		useDispatch<AppDispatch>()

	const ws = useContext(WebSocketContext)

	const handleClick = () => {
		ws?.sendMessage('hello')
	}

	return (
		<div>
			<h3>Current users from db:</h3>

			<h4>
				{!users ? (
					'Loading...'
				) : (
					<div>
						<button onClick={handleClick}>testbutton</button>
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
					</div>
				)}
			</h4>
		</div>
	)
}
