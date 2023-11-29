import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable('docks', {
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
		})
		await queryInterface.createTable('ships', {
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
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable('docks')
		await queryInterface.dropTable('ships')
	},
}
