import { Model, DataTypes } from 'sequelize'

import db from '../util/db'

const { sequelize } = db

class Ship extends Model {}

Ship.init(
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
		modelName: 'ship',
	}
)

export default Ship
