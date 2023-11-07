import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: number = new Date().valueOf()

const timeSlice = createSlice({
	name: 'time',
	initialState: initialState,
	reducers: {
		setTime(state, action: PayloadAction<number>): number {
			state = action.payload
			return state
		},
		getTime(state): number {
			return state
		},
		// appendUser(state, action: PayloadAction<User>) {
		// 	state.push(action.payload)
		// },
		// setUsers(_state, action: PayloadAction<User[]>) {
		// 	return action.payload
		// },
		// dropUser(state, action: PayloadAction<string>) {
		// 	return state.filter((u) => u.id !== action.payload)
		// },
	},
})

// export const initializeUsers = () => {
// 	return async (dispatch: Dispatch) => {
// 		const users = await userService.getAll()
// 		dispatch(userSlice.actions.setUsers(users))
// 	}
// }

// export const createUser = (content: UserNoId) => {
// 	return async (dispatch: Dispatch) => {
// 		const newUser = await userService.create(content)
// 		dispatch(appendUser(newUser.data))
// 	}
// }

// export const removeUser = (id: string) => {
// 	return async (dispatch: Dispatch) => {
// 		userService.remove(id)
// 		dispatch(dropUser(id))
// 	}
// }

export const { setTime, getTime } = timeSlice.actions

export default timeSlice.reducer
