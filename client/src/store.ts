import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import timeReducer from './reducers/timeReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userLevelReducer from './reducers/userLevelReducer'

export const store = configureStore({
	reducer: {
		users: userReducer,
		time: timeReducer,
		loggedUser: loggedUserReducer,
		userlevels: userLevelReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
