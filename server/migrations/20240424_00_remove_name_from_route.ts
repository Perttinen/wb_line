import { QueryInterface } from 'sequelize'

module.exports = {
    up: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.removeColumn('routes', 'name')
    },
}