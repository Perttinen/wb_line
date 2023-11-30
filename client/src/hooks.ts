import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect } from 'react'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { initializeUserLevels } from './reducers/userLevelReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeDocks } from './reducers/dockReducer'
import { initializeShips } from './reducers/shipReducer'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInitializers = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedWbUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setLoggedUser(user))
		}
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUserLevels())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeDocks())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeShips())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	// dispatch(initializeUsers())

	// dispatch(initializeDocks())
}
