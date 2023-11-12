import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable('user_levels', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			level_name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			level_number: {
				type: DataTypes.INTEGER,
				unique: true,
				allowNull: false,
			},
		})
		await queryInterface.addColumn('users', 'user_level_id', {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: { model: 'user_levels', key: 'id' },
		})
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.removeColumn('users', 'user_level_id')
		await queryInterface.dropTable('user_levels')
	},
}
