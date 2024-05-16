import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { InitRouteType, RouteType, StopNoIdType } from 'types'
import { routeService, stopService } from 'services'
import { createStop } from './stopReducer'
import { initializeDepartures } from './departureReducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'



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
		const newRoute: RouteType = await routeService.create({ startDockId: content.startDockId, endDockId: content.endDockId })
		const stopsWithRouteId: StopNoIdType[] = content.stops.map(s => { return { ...s, routeId: newRoute.id } })
		const newStops: StopNoIdType[] = await stopService.create(stopsWithRouteId)
		createStop(newStops)
		dispatch(appendRoute(await routeService.getOne(newRoute.id)))
	}
}

export const removeRoute = (id: number) => {
	return async (dispatch: Dispatch) => {
		await routeService.remove(id)
		dispatch(dropRoute(id))
	}
}

export const { dropRoute, appendRoute, setRoutes } = routeSlice.actions

export default routeSlice.reducer
