const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('users')
	},
}
