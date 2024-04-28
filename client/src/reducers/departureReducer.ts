import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { DepartureType, initDepartureType } from '../../../types'
import scheduleService from '../services/schedules'

type State = DepartureType[]

const departureSlice = createSlice({
	name: 'departures',
	initialState: [] as State,
	reducers: {
		appendDeparture(state, action: PayloadAction<DepartureType[]>) {
			return [...state, ...action.payload]
		},
		setDepartures(_state, action: PayloadAction<DepartureType[]>) {
			return action.payload
		},
		dropDeparture(state, action: PayloadAction<number[]>) {
			return state.filter((u) => !action.payload.includes(u.id))
		},
	},
})

export const initializeDepartures = () => {
	return async (dispatch: Dispatch) => {
		const departures = await scheduleService.getAll()


		dispatch(departureSlice.actions.setDepartures(departures))
	}
}

export const createDeparture = (content: initDepartureType[]) => {
	return async (dispatch: Dispatch) => {
		const newDeparture = await scheduleService.create(content)
		console.log(newDeparture);
		dispatch(appendDeparture(newDeparture))
	}
}

export const removeDeparture = (id: number[]) => {
	return async (dispatch: Dispatch) => {
		scheduleService.remove(id)
		dispatch(dropDeparture(id))
	}
}

export const { dropDeparture, appendDeparture, setDepartures } =
	departureSlice.actions

export default departureSlice.reducer
