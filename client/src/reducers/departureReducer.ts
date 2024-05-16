import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { DepartureType, initDepartureType } from 'types'
import { departureService } from 'services'

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
		const departures = await departureService.getAll()
		dispatch(departureSlice.actions.setDepartures(departures))
	}
}

export const createDeparture = (departures: initDepartureType[]) => {
	return async (dispatch: Dispatch) => {
		const newDepartures = await departureService.create(departures)
		dispatch(appendDeparture(newDepartures))
	}
}

export const removeDeparture = (id: number[]) => {
	return async (dispatch: Dispatch) => {
		await departureService.remove(id)
		dispatch(dropDeparture(id))
	}
}

export const { dropDeparture, appendDeparture, setDepartures } =
	departureSlice.actions

export default departureSlice.reducer
