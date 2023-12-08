import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class Departure extends Model {}

Departure.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		routeId: {
			type: DataTypes.INTEGER,
			references: { model: 'routes', key: 'id' },
			allowNull: false,
		},
		startTime: {
			type: DataTypes.DATE,
			unique: false,
			allowNull: false,
		},
	},

	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'departure',
	}
)

export default Departure
