import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { UserWithTokenType } from 'types'
import { userService } from 'services'

const initialState: UserWithTokenType = {} as UserWithTokenType

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
		getLoggedUser(state) {
			return state
		},
		removeLoggedUser() {
			return initialState
		},
	},
})

export const initializeLoggedUser = () => {
	return async (dispatch: Dispatch) => {
		try {
			const user = await userService.getCurrentUser()


			dispatch(loggedUserSlice.actions.setLoggedUser(user))
		} catch (e) {
		}
	}
}

export const { setLoggedUser, getLoggedUser, removeLoggedUser } =
	loggedUserSlice.actions

export default loggedUserSlice.reducer
