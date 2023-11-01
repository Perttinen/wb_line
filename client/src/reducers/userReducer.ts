import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import userService from '../services/users'
import { User, UserNoId } from '../../../types'

type State = User[]

const userSlice = createSlice({
	name: 'users',
	initialState: [] as State,
	reducers: {
		appendUser(state, action: PayloadAction<User>) {
			state.push(action.payload)
		},
		setUsers(_state, action: PayloadAction<User[]>) {
			return action.payload
		},
		dropUser(state, action: PayloadAction<string>) {
			console.log(action.payload)
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeUsers = () => {
	return async (dispatch: Dispatch) => {
		const users = await userService.getAll()
		dispatch(userSlice.actions.setUsers(users))
	}
}

export const createUser = (content: UserNoId) => {
	return async (dispatch: Dispatch) => {
		const newUser = await userService.create(content)
		dispatch(appendUser(newUser.data))
	}
}

export const removeUser = (id: string) => {
	return async (dispatch: Dispatch) => {
		userService.remove(id)
		dispatch(dropUser(id))
	}
}

export const { dropUser, appendUser, setUsers } = userSlice.actions

export default userSlice.reducer
