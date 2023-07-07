module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {

        userId : {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull : false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull : false
        },
        nickname : {
            type: DataTypes.STRING,
            allowNull : false,
            
        }

    }, {
        timestamps : false
    })
    return users
}