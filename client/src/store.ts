import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import timeReducer from './reducers/timeReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

export const store = configureStore({
	reducer: {
		users: userReducer,
		time: timeReducer,
		loggedUser: loggedUserReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
