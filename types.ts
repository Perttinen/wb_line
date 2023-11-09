export type User = {
	id: string
	name: string
	username: string
	password: string
}

export type UserNoId = {
	name: string
	username: string
	password: string
}

export type LoginUser = {
	username: string
	password: string
}

export type UserType = {
	id: string
	name: string
	username: string
	password: string
}

export type UserForTokenType = {
	username: string
	id: string
}

export type UserWithTokenType = {
	id: string
	name: string
	username: string
	password: string
	token: string
}
