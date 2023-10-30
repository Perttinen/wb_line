import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		appendUser(state, action) {
			state.push(action.payload)
		},
		setUsers(state, action) {
			return action.payload
		},
		dropUser(state, action) {
			console.log(action.payload)
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

export const createUser = (content) => {
	return async (dispatch) => {
		const newUser = await userService.create(content)
		dispatch(appendUser(newUser.data))
	}
}

export const removeUser = (id) => {
	return async (dispatch) => {
		userService.remove(id)
		dispatch(dropUser(id))
	}
}

export const { dropUser, appendUser, setUsers } = userSlice.actions

export default userSlice.reducer
