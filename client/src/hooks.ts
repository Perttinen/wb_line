import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect } from 'react'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { initializeUserLevels } from './reducers/userLevelReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeDocks } from './reducers/dockReducer'
import { initializeShips } from './reducers/shipReducer'
import { initializeRoutes } from './reducers/routeReducer'
import { initializeDepartures } from './reducers/departureReducer'
import userService from './services/users'
import { UserWithTokenType } from '../../types'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInitializers = () => {
	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	// useEffect(() => {
	// 	const loggedUserJSON = window.localStorage.getItem('loggedWbUser')
	// 	if (loggedUserJSON) {
	// 		const user = JSON.parse(loggedUserJSON)
	// 		dispatch(setLoggedUser(user))
	// 	}
	// }, [dispatch])

	useEffect( () => {
		const getCurrentUser = async (): Promise<UserWithTokenType> => {
			return await userService.getCurrentUser()
		}

		const token = localStorage.getItem('token')
		if (token) {	
			getCurrentUser().then(user => {
			dispatch(setLoggedUser(user))})
		}
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUserLevels())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeRoutes())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeDepartures())
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
}
