import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class UserLevel extends Model {}

UserLevel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		levelName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			defaultValue: 'user',
		},
		levelNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'userLevel',
	}
)

export default UserLevel
