const {messages} = require('../models/index');

async function saveSendMessage (io,socket,message, onlineUsers){
    try{
        // determine if a message is private or belongs to a specific room
        if(message.hasOwnProperty('recepientId')){
            const recepientId = message.recepientId;
            console.log('sender socket id '+ socket.id);
            const recepientSocketId = onlineUsers.get(recepientId);
            console.log('requested user socket id ' + recepientSocketId);
            console.log(onlineUsers);
            if(recepientSocketId){ // means if the recepient is online
                socket.to(recepientSocketId).emit('private message', message);
                console.log('pv message event emmited from ' + socket.id + ' to' + recepientSocketId);
            }
            await messages.create(message);
            return;
        }
        else {
            // send message to room instead
        }
    }catch(err){
        // handle error here
    }
    

}





module.exports = {
    saveSendMessage
}