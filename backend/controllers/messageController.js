const {messages} = require('../models/index')



async function sendMessage(req,res,next) {
    const {senderId, recepientId, text, creationDate, roomId} = req.body;
    const msg = {
        senderId,text,creationDate, recepientId: null, roomId: null
    }
    try{
        if(recepientId && !roomId){
            msg.recepientId = recepientId;
            const privateMessage = await messages.create(msg);
            return res.status(201).json({
                message: 'message sent',
                msg
            })
        }
        else if(!recepientId && roomId){
            msg.roomId = roomId;
            const roomMessage = await message.create(msg);
            return res.status(201).json({
                message: 'message sent',
                msg
            })
        }

    }catch(err){
        err.message = 'unable to send message!'
        next(err)
    }
}

async function getPrivateMessages (req,res,next){
    const {senderId, recepientId} = req.body;
    try{
        const fetchedMessages = await messages.findAll({where: {senderId: senderId, recepientId: recepientId}})
        res.status(200).json({
            message: 'private messages records found successfully',
            fetchedMessages
        })
    }catch(err){
        err.message = 'unable to fetch messages'
        next(err)
    }
}

async function getRoomMessages (req,res,next) {
    const {roomId} = req.body;
    try{
        const roomMessages = await messages.findAll({where : { roomId: roomId}});
        return res.status(200).json({
            message: 'room messages fetched successfully',
            roomMessages
        })
    }catch(err){
        err.message = 'unable to fetch room messages'
        next(err)
    }
}





module.exports = {
    sendMessage,getPrivateMessages, getRoomMessages
}
