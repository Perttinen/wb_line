import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { ShipType, ShipNoIdType } from 'types'
import { shipService } from 'services'

type State = ShipType[]

const shipSlice = createSlice({
	name: 'ships',
	initialState: [] as State,
	reducers: {
		appendShip(state, action: PayloadAction<ShipType>) {
			state.push(action.payload)
		},
		setShips(_state, action: PayloadAction<ShipType[]>) {
			return action.payload
		},
		dropShip(state, action: PayloadAction<number>) {
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeShips = () => {
	return async (dispatch: Dispatch) => {
		const ships = await shipService.getAll()
		dispatch(shipSlice.actions.setShips(ships))
	}
}

export const createShip = (content: ShipNoIdType) => {
	return async (dispatch: Dispatch) => {
		const newShip = await shipService.create(content)
		dispatch(appendShip(newShip.data))
	}
}

export const removeShip = (id: number) => {
	return async (dispatch: Dispatch) => {
		shipService.remove(id)
		dispatch(dropShip(id))
	}
}

export const { dropShip, appendShip, setShips } = shipSlice.actions

export default shipSlice.reducer
