import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { userService } from 'services'
import { UserType, UserNoIdType, ChangePasswordType } from 'types'

type State = UserType[]

const userSlice = createSlice({
	name: 'users',
	initialState: [] as State,
	reducers: {
		appendUser(state, action: PayloadAction<UserType>) {
			state.push(action.payload)
		},
		setUsers(_state, action: PayloadAction<UserType[]>) {
			return action.payload
		},
		dropUser(state, action: PayloadAction<number>) {
			return state.filter((u) => u.id !== action.payload)
		},
		updatePassword(state, action: PayloadAction<UserType>) {
			return state.map(u => u.id === action.payload.id ? action.payload : u)
		}
	},
})

export const initializeUsers = () => {
	return async (dispatch: Dispatch) => {
		const users = await userService.getAll()
		dispatch(userSlice.actions.setUsers(users))
	}
}

export const createUser = (content: UserNoIdType) => {
	return async (dispatch: Dispatch) => {
		const newUser = await userService.create(content)
		dispatch(appendUser(newUser.data))
	}
}

export const removeUser = (id: number) => {
	return async (dispatch: Dispatch) => {
		userService.remove(id)
		dispatch(dropUser(id))
	}
}

export const changeCurrentPassword = (values: ChangePasswordType) => {
	return async (dispatch: Dispatch) => {
		console.log('reducer');

		const newUser: UserType = await userService.update(values)
		console.log('newUser: ', newUser);

		dispatch(updatePassword(newUser))
	}
}

export const { dropUser, appendUser, setUsers, updatePassword } = userSlice.actions

export default userSlice.reducer
