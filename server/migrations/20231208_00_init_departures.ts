import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable('departures', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			route_id: {
				type: DataTypes.INTEGER,
				references: { model: 'routes', key: 'id' },
				allowNull: false,
			},
			start_time: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: false,
			},
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable('departures')
	},
}
