import User from './user'
import UserLevel from './userLevel'
import Dock from './dock'
import Ship from './ship'
import Stop from './stop'
import Route from './route'

User.belongsTo(UserLevel, { foreignKey: 'user_level_id' })
UserLevel.hasMany(User, { foreignKey: 'user_level_id' })

Dock.hasMany(Route, { foreignKey: 'startDockId' })
Route.belongsTo(Dock, { as: 'startDock', foreignKey: 'startDockId' })
Route.belongsTo(Dock, { as: 'endDock', foreignKey: 'endDockId' })

// Dock.hasMany(Route, { foreignKey: 'endDockId' })
// Route.belongsTo(Dock, { foreignKey: 'endDockId' })

Route.belongsToMany(Dock, { through: Stop })
Dock.belongsToMany(Route, { through: Stop })

export { User, UserLevel, Dock, Ship, Stop, Route }
