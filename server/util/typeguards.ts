import { ChangePasswordType } from "../../types"

export const toChangePasswordType = (object: unknown): ChangePasswordType => {
	const isString = (text: unknown): text is string => {
		return typeof text === 'string' || text instanceof String
	}
	const parseString = (text: unknown): string => {
		if (!isString(text)) {
			throw new Error('incorrect or missing value in object')
		}
		return text
	}
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data')
	}
	if (
		'currentPassword' in object &&
		'newPassword' in object &&
		'confirmPassword' in object
	) {
		const newPWT: ChangePasswordType = {
			currentPassword: parseString(object.currentPassword),
			newPassword: parseString(object.newPassword),
			confirmPassword: parseString(object.confirmPassword),
		}
		return newPWT
	}
	throw new Error('Incorrect data: a field missing')
}

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

export const parseString = (text: unknown): string => {
	if (!isString(text)) {
		throw new Error('incorrect or missing value in object')
	}
	return text
}