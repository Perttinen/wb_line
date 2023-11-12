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
}

export type UserForTokenType = {
	username: string
	id: number
}

export type UserWithTokenType = {
	id: string
	name: string
	username: string
	password: string
	token: string
}

export type UserLevelType = {
	id: number
	levelName: string
	levelNumber: number
}
