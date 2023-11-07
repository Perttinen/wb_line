import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

const loggedUserSlice = createSlice({
	name: 'loggedUser',
	initialState: initialState,
	reducers: {
		setloggedUser(state, action: PayloadAction<string>): string {
			state = action.payload
			return state
		},
		getloggedUser(state): string {
			return state
		},
	},
})

export const { setloggedUser, getloggedUser } = loggedUserSlice.actions

export default loggedUserSlice.reducer
