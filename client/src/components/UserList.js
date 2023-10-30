import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

export const UserList = ({ delbutton }) => {
	const users = useSelector((state) => state.users)
	const dispatch = useDispatch()

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
