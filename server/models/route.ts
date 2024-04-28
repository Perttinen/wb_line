import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class Route extends Model { }

Route.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		// name: {
		// 	type: DataTypes.STRING,
		// 	unique: true,
		// 	allowNull: false,
		// },
		startDockId: {
			type: DataTypes.INTEGER,
			references: { model: 'docks', key: 'id' },
			allowNull: false,
		},
		endDockId: {
			type: DataTypes.INTEGER,
			references: { model: 'docks', key: 'id' },
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'route',
	}
)

export default Route
