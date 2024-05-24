import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { DepartureType, initDepartureType } from 'types'
import { departureService } from 'services'
import { AxiosError } from 'axios'

type State = DepartureType[]

const shortlistSlice = createSlice({
    name: 'shortlist',
    initialState: [] as State,
    reducers: {
        appendShortlist(state, action: PayloadAction<DepartureType[]>) {
            return [...state, ...action.payload]
        },
        setShortlist(_state, action: PayloadAction<DepartureType[]>) {
            return action.payload
        },
        dropShortlist(state, action: PayloadAction<number[]>) {
            return state.filter((u) => !action.payload.includes(u.id))
        },
    },
})

export const initializeShortlist = () => {
    return async (dispatch: Dispatch) => {

        const shortlist = await departureService.getShortlist()
        dispatch(setShortlist(shortlist))


    }
}

export const createShortlist = (shortlist: initDepartureType[]) => {
    return async (dispatch: Dispatch) => {
        const newDepartures = await departureService.createShortlist(shortlist)
        dispatch(appendShortlist(newDepartures))
    }
}

export const removeShortlist = (id: number[]) => {
    return async (dispatch: Dispatch) => {
        await departureService.removeShortlist(id)
        dispatch(dropShortlist(id))
    }
}

export const { dropShortlist, appendShortlist, setShortlist } =
    shortlistSlice.actions

export default shortlistSlice.reducer