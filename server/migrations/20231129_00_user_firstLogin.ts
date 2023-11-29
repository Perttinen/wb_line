import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.addColumn('users', 'first_time', {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.removeColumn('users', 'first_time')
	},
}
