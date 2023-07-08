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
        roomId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull : false
        },
        
       date: {
        type: DataTypes.STRING,
        allowNull: false
       },

       time: {
        type: DataTypes.STRING,
        allowNull: false
       }
    }, {
        timestamps: false
    })
    return messages
}