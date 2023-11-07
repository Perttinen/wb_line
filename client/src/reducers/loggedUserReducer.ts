import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

const loggedUserSlice = createSlice({
	name: 'loggedUser',
	initialState: initialState,
	reducers: {
		setLoggedUser(state, action: PayloadAction<string>): string {
			state = action.payload
			return state
		},
		getLoggedUser(state): string {
			return state
		},
	},
})

export const { setLoggedUser, getLoggedUser } = loggedUserSlice.actions

export default loggedUserSlice.reducer
