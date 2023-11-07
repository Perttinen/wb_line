import { useDispatch } from 'react-redux'

import { AppDispatch } from '../store'
import { setloggedUser } from '../reducers/loggedUserReducer'

export const Login = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()
	return (
		<div>
			<button onClick={() => dispatch(setloggedUser('joku'))}>login</button>
		</div>
	)
}
