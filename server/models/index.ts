import User from './user'
import UserLevel from './userLevel'

User.belongsTo(UserLevel, { foreignKey: 'user_level_id' })
UserLevel.hasMany(User, { foreignKey: 'user_level_id' })

export { User, UserLevel }
