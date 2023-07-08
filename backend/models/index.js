const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig');


const sequelize = new Sequelize(dbConfig.db, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});


sequelize.authenticate().then(()=>{
    console.log(`connected to database`);
}
).catch((err)=>{
    console.log(dbConfig);
    console.log(`failed to connect to database`)
    }
)

const db = {}

db.rooms = require('./rooms')(sequelize, DataTypes);
db.messages = require('./messages')(sequelize, DataTypes);
db.users = require('./users')(sequelize,DataTypes);
db.friends = require('./friends')(sequelize, DataTypes);
db.sequelize = sequelize;


db.users.belongsToMany(db.rooms,{through : 'UsersRooms'});
db.rooms.belongsToMany(db.users, {through : 'UsersRooms'});


db.messages.sync({force:false}).then(()=>{
    console.log(`re-sync done`)
}
).catch((err)=>{
    console.log(err);
    console.log(`re-sync failed`)
}
)

module.exports = db;