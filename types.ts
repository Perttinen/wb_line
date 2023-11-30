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
	userLevel: UserLevelType
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
