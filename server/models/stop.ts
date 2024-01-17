import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class Stop extends Model {}

Stop.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		delayTimeMinutes: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dockId: {
			type: DataTypes.INTEGER,
			references: { model: 'docks', key: 'id' },
			allowNull: false,
		},
		routeId: {
			type: DataTypes.INTEGER,
			references: { model: 'routes', key: 'id' },
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'stop',
	}
)

export default Stop
