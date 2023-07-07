module.exports = (sequelize,DataTypes) => {
    const friends = sequelize.define('friends', {
        userId :{
            type : DataTypes.STRING,
            allowNull : false
        },
        friendId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false            
        }
    }, {
        timestamps: false
    })
    return friends;
}