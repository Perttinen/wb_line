import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { StopNoIdType, StopType } from 'types'
import { stopService } from 'services'

type State = StopType[]

const stopSlice = createSlice({
	name: 'stops',
	initialState: [] as State,
	reducers: {
		appendStop(state, action: PayloadAction<StopType>) {
			state.push(action.payload)
		},
		setStops(_state, action: PayloadAction<StopType[]>) {
			return action.payload
		},
		dropStop(state, action: PayloadAction<number>) {
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeStops = () => {


	return async (dispatch: Dispatch) => {
		const stops = await stopService.getAll()
		dispatch(stopSlice.actions.setStops(stops))
	}
}

export const createStop = (content: StopNoIdType[]) => {
	return async (dispatch: Dispatch) => {
		const newStop = await stopService.create(content)
		dispatch(appendStop(newStop.data))
		return newStop
	}
}

export const removeStop = (id: number) => {
	return async (dispatch: Dispatch) => {
		stopService.remove(id)
		dispatch(dropStop(id))
	}
}

export const { dropStop, appendStop, setStops } = stopSlice.actions

export default stopSlice.reducer
