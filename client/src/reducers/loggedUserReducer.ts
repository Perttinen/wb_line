import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserWithTokenType } from '../../../types'

const initialState: UserWithTokenType = {
	username: '',
	password: '',
	id: '',
	name: '',
	token: '',
}

const loggedUserSlice = createSlice({
	name: 'loggedUser',
	initialState: initialState,
	reducers: {
		setLoggedUser(
			state,
			action: PayloadAction<UserWithTokenType>
		): UserWithTokenType {
			state = action.payload
			return state
		},
		getLoggedUser(state): UserWithTokenType {
			return state
		},
		removeLoggedUser() {
			return initialState
		},
	},
})

export const { setLoggedUser, getLoggedUser, removeLoggedUser } =
	loggedUserSlice.actions

export default loggedUserSlice.reducer
