module.exports = (sequelize, DataTypes) => {
    const rooms = sequelize.define('rooms', {
        roomId:{
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        topic : {
            type: DataTypes.STRING,
            allowNull: false
        },
        adminUserId: {
            type: DataTypes.STRING,
            allowNull : false
        },
        isPrivate: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps : false
    })
    return rooms
}