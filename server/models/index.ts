import User from './user'
import UserLevel from './userLevel'
import Dock from './dock'
import Ship from './ship'
import Stop from './stop'
import Route from './route'
import Departure from './departure'

User.belongsTo(UserLevel, { foreignKey: 'user_level_id' })
UserLevel.hasMany(User, { foreignKey: 'user_level_id' })

Dock.hasMany(Route, { foreignKey: 'startDockId' })
Route.belongsTo(Dock, { as: 'startDock', foreignKey: 'startDockId' })
Route.belongsTo(Dock, { as: 'endDock', foreignKey: 'endDockId' })

Route.belongsToMany(Dock, { through: Stop, onDelete: 'CASCADE' })
Dock.belongsToMany(Route, { through: Stop })

Stop.belongsTo(Route, { onDelete: 'CASCADE' })
Route.hasMany(Stop, { onDelete: 'CASCADE' })

Dock.hasMany(Stop, { onDelete: 'CASCADE' })
Stop.belongsTo(Dock, { as: 'dock' })

// Departure.hasMany(Route, { onDelete: 'CASCADE' })
// Route.belongsTo(Departure
//     , { onDelete: 'CASCADE' }
//     // , { as: 'departure' }
// )
// Route.hasMany(Departure, { onDelete: 'CASCADE' })
// Departure.belongsTo(Route, { onDelete: 'CASCADE' })
Route.hasMany(Departure, { onDelete: 'CASCADE' })
Departure.belongsTo(Route, { onDelete: 'CASCADE', as: 'route', foreignKey: 'routeId' })
// Route.hasMany(Departure, { onDelete: 'CASCADE' })
// Departure.belongsTo(Route, { onDelete: 'CASCADE', as: 'route', foreignKey: 'routeId' })

export { User, UserLevel, Dock, Ship, Stop, Route, Departure }
