import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect } from 'react'

import { initializeUserLevels } from './reducers/userLevelReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeDocks } from './reducers/dockReducer'
import { initializeShips } from './reducers/shipReducer'
import { initializeRoutes } from './reducers/routeReducer'
import { initializeDepartures } from './reducers/departureReducer'
import { initializeLoggedUser } from './reducers/loggedUserReducer'
import { initializeShortlist } from 'reducers/shortlistReducer'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInitializers = () => {

	const dispatch: (...args: unknown[]) => Promise<string> =
		useDispatch<AppDispatch>()

	useEffect(() => {

		if (localStorage.getItem('token')) {

			dispatch(initializeLoggedUser())
			dispatch(initializeRoutes())
			dispatch(initializeUserLevels())
			dispatch(initializeDepartures())
			dispatch(initializeDocks())
			dispatch(initializeShips())
			dispatch(initializeUsers())
			dispatch(initializeShortlist())
		}
	}, [dispatch])
}
