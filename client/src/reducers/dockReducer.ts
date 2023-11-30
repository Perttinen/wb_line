import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { DockType, DockNoIdType } from '../../../types'
import dockService from '../services/docks'

type State = DockType[]

const dockSlice = createSlice({
	name: 'docks',
	initialState: [] as State,
	reducers: {
		appendDock(state, action: PayloadAction<DockType>) {
			state.push(action.payload)
		},
		setDocks(_state, action: PayloadAction<DockType[]>) {
			return action.payload
		},
		dropDock(state, action: PayloadAction<number>) {
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeDocks = () => {
	console.log('init')

	return async (dispatch: Dispatch) => {
		const docks = await dockService.getAll()
		dispatch(dockSlice.actions.setDocks(docks))
	}
}

export const createDock = (content: DockNoIdType) => {
	return async (dispatch: Dispatch) => {
		const newDock = await dockService.create(content)
		dispatch(appendDock(newDock.data))
	}
}

export const removeDock = (id: number) => {
	return async (dispatch: Dispatch) => {
		dockService.remove(id)
		dispatch(dropDock(id))
	}
}

export const { dropDock, appendDock, setDocks } = dockSlice.actions

export default dockSlice.reducer
