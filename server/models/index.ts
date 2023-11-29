import User from './user'
import UserLevel from './userLevel'
import Dock from './dock'
import Ship from './ship'

User.belongsTo(UserLevel, { foreignKey: 'user_level_id' })
UserLevel.hasMany(User, { foreignKey: 'user_level_id' })

export { User, UserLevel, Dock, Ship }
