module.exports = (sequelize, DataTypes) => {

    const messages = sequelize.define('messages', {
        
        senderId:{
            type: DataTypes.STRING,
            allowNull : false
        },
        recepientId:{
            type: DataTypes.STRING,
            allowNull : true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull : false
        },
        likes : {
            type: DataTypes.STRING,
            allowNull : true
        },
        dislikes : {
            type: DataTypes.STRING,
            allowNull : true
        },
        createionDate : {
            type: DataTypes.STRING,
            allowNull : false            
        },
        updateDate: {
            type: DataTypes.STRING,
            allowNull : true
        },
        roomId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    })
    return messages
}