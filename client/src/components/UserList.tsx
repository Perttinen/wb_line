import { useSelector } from 'react-redux'
import { User } from '../../../types'
import { WebSocketContext } from '../WebSocket'
import { useContext } from 'react'

export const UserList = ({ delbutton }: { delbutton: boolean }) => {
	const users = useSelector((state: { users: User[] }) => state.users)

	const ws = useContext(WebSocketContext)

	return (
		<div>
			<h3>Current users from db:</h3>

			<h4>
				{!users ? (
					'Loading...'
				) : (
					<div>
						<ul>
							{users.map((u) => (
								<li key={u.id}>
									{u.name} {u.id}{' '}
									{delbutton === true ? (
										<button onClick={() => ws?.sendRemoveUser(u.id)}>
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
