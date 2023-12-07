import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import timeReducer from './reducers/timeReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userLevelReducer from './reducers/userLevelReducer'
import dockReducer from './reducers/dockReducer'
import shipReducer from './reducers/shipReducer'
import routeReducer from './reducers/routeReducer'
import stopReducer from './reducers/stopReducer'

export const store = configureStore({
	reducer: {
		users: userReducer,
		time: timeReducer,
		loggedUser: loggedUserReducer,
		userlevels: userLevelReducer,
		docks: dockReducer,
		ships: shipReducer,
		routes: routeReducer,
		stops: stopReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
