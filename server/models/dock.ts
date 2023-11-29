import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class Dock extends Model {}

Dock.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'dock',
	}
)

export default Dock
