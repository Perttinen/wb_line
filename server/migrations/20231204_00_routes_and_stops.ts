import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable('routes', {
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
			start_dock_id: {
				type: DataTypes.INTEGER,
				references: { model: 'docks', key: 'id' },
				allowNull: false,
			},
			end_dock_id: {
				type: DataTypes.INTEGER,
				references: { model: 'docks', key: 'id' },
				allowNull: false,
			},
		})
		await queryInterface.createTable('stops', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			delay_time_minutes: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			dock_id: {
				type: DataTypes.INTEGER,
				references: { model: 'docks', key: 'id' },
				allowNull: false,
			},
			route_id: {
				type: DataTypes.INTEGER,
				references: { model: 'routes', key: 'id' },
				allowNull: false,
			},
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable('routes')
		await queryInterface.dropTable('stops')
	},
}
