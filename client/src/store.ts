import { configureStore } from '@reduxjs/toolkit'

import { shortlistReducer, departureReducer, stopReducer, shipReducer, routeReducer, dockReducer, userLevelReducer, loggedUserReducer, userReducer } from 'reducers'

export const store = configureStore({
	reducer: {
		users: userReducer,
		loggedUser: loggedUserReducer,
		userlevels: userLevelReducer,
		docks: dockReducer,
		ships: shipReducer,
		routes: routeReducer,
		stops: stopReducer,
		departures: departureReducer,
		shortlist: shortlistReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
