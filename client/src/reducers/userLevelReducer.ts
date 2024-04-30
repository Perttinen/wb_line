import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import userLevelService from 'services/userLevel'
import { UserLevelType } from 'types'

type State = UserLevelType[]

const userLevelSlice = createSlice({
	name: 'userlevels',
	initialState: [] as State,
	reducers: {
		setUserLevels(_state, action: PayloadAction<UserLevelType[]>) {
			return action.payload
		},
	},
})

export const initializeUserLevels = () => {
	return async (dispatch: Dispatch) => {
		const userLevels = await userLevelService.getAll()
		dispatch(userLevelSlice.actions.setUserLevels(userLevels))
	}
}

export const { setUserLevels } = userLevelSlice.actions

export default userLevelSlice.reducer
