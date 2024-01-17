import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { InitRouteType, RouteNoIdType, RouteType } from '../../../types'
import routeService from '../services/route'

type State = RouteType[]

const routeSlice = createSlice({
	name: 'routes',
	initialState: [] as State,
	reducers: {
		appendRoute(state, action: PayloadAction<RouteType>) {
			state.push(action.payload)
		},
		setRoutes(_state, action: PayloadAction<RouteType[]>) {
			return action.payload
		},
		dropRoute(state, action: PayloadAction<number>) {
			return state.filter((u) => u.id !== action.payload)
		},
	},
})

export const initializeRoutes = () => {
	return async (dispatch: Dispatch) => {
		const routes = await routeService.getAll()
		dispatch(routeSlice.actions.setRoutes(routes))
	}
}

export const createRoute = (content: InitRouteType) => {
	return async (dispatch: Dispatch) => {
		const newRoute = await routeService.create(content)

		dispatch(appendRoute(newRoute.data))
	}
}

export const removeRoute = (id: number) => {
	return async (dispatch: Dispatch) => {
		routeService.remove(id)
		dispatch(dropRoute(id))
	}
}

export const { dropRoute, appendRoute, setRoutes } = routeSlice.actions

export default routeSlice.reducer
