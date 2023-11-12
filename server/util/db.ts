import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { Umzug, SequelizeStorage } from 'umzug'

dotenv.config()

const sequelize: Sequelize =
	process.env.NODE_ENV === 'dev'
		? new Sequelize(
				process.env.DATABASE!,
				process.env.DATABASEUSER!,
				process.env.DATABASEPASSWORD,
				{
					host: process.env.HOST,
					dialect: 'postgres',
					protocol: 'postgres',
					dialectOptions: {
						ssl: {
							require: true,
							rejectUnauthorized: false,
						},
					},
				}
		  )
		: new Sequelize(process.env.LOCAL_DB!)

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate()
		await runMigrations()
		console.log('database connected')
	} catch (err) {
		console.log('connecting database failed')
		console.log(err)
		return process.exit(1)
	}

	return null
}

const migrationConf = {
	migrations: {
		glob: 'server/migrations/*.ts',
	},
	storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
	context: sequelize.getQueryInterface(),
	logger: console,
}

const runMigrations = async () => {
	const migrator = new Umzug(migrationConf)
	const migrations = await migrator.up()
	console.log('Migrations up to date', {
		files: migrations.map((mig) => mig.name),
	})
}
const rollbackMigration = async () => {
	await sequelize.authenticate()
	const migrator = new Umzug(migrationConf)
	await migrator.down()
}

export default {
	connectToDatabase,
	sequelize,
	rollbackMigration,
	runMigrations,
}
