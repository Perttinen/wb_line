import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.addColumn('users', 'password', {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'defaultpassword',
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.removeColumn('users', 'password')
	},
}
