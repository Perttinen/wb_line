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
	},
})

export const { setTime, getTime } = timeSlice.actions

export default timeSlice.reducer
