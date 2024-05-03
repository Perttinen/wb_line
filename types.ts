import { Dayjs } from 'dayjs'

export type User = {
	id: string
	name: string
	username: string
	password: string
}

export type UserNoIdType = {
	name: string
	username: string
	password: string
	user_level_id: number
	firstTime: boolean
}

export type LoginUser = {
	username: string
	password: string
}

export type UserType = {
	id: number
	name: string
	username: string
	password: string
	user_level_id: number
	firstTime: boolean
}

export type UserForTokenType = {
	username: string
	id: number
}

export type UserWithTokenType = {
	id: number
	name: string
	username: string
	password: string
	user_level_id: number
	userLevel: UserLevelType
	token: string
	firstTime: boolean
}

export type UserLevelType = {
	id: number
	levelName: string
	levelNumber: number
}

export type ChangePasswordType = {
	currentPassword: string
	newPassword: string
	confirmPassword: string
	userId: number
}

export type ConfirmedPasswordsType = {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

export type userNoLevelsType = {
	id: number
	name: string
	username: string
	password: string
	user_level_id: number
}

export type ShipType = {
	id: number
	name: string
}

export type ShipNoIdType = {
	name: string
}

export type DockType = {
	id: number
	name: string
}

export type DockNoIdType = {
	name: string
}

export type RouteType = {
	id: number
	startDockId: number
	endDockId: number
}

export type RouteNoIdType = {
	startDockId: number
	endDockId: number
}

export type InitRouteType = {
	startDockId: number
	endDockId: number
	stops: { dockId: number, delayTimeMinutes: number }[]
}

export type StopType = {
	id: number
	delayTimeMinutes: number
	dockId: number
	routeId: number
}
export type StopNoIdType = {
	delayTimeMinutes: number
	dockId: number
	routeId: number
}

export type initDepartureType = {
	startTime: Dayjs | null
	routeId: number | ''
}

export interface DepartureType {
	id: number
	startTime: string
	route: {
		id: number
		startDock: {
			id: number
			name: string
		}
		endDock: {
			id: number
			name: string
		}
		stops: {
			id: number
			delayTimeMinutes: number
			dock: {
				id: number
				name: string
			}
		}[]
	}
}

export type DockNameType = {
	dock: string
}

export type RouteDocksType = {
	id: number,
	name: string
}

export type StopWithDockType = {
	id: number
	delayTimeMinutes: number
	dockId: number
	routeId: number
	dock: DockType
}

export type RouteWithAllType = {
	id: number
	startDock: DockType
	endDock: DockType
	stops: StopWithDockType[]
}