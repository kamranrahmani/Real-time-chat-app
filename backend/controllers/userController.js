const {users, friends, rooms} = require('../models/index');






// accept/decline friend requests


async function createRoom(req,res,next) {
    const {roomId, topic, adminUserId, isPrivate} = req.body;
    if(!roomId || !topic || !adminUserId || isPrivate){
        return res.status(400).json({
            message: 'please provide necessary room info'
        })
    }
    try{
        const existingRoom = await rooms.findOne({where : {roomId : roomId}});
        if(existingRoom){
            return res.status(400).json({
                message: `The room with id ${roomId} already exists.`
            })
        }
        const newRoom = {
            roomId, topic, adminUserId, isPrivate: isPrivate === 'YES'? 'YES' : 'NO'
        }
        const createdRoom = await rooms.create(newRoom);
        return res.status(201).json({
            message: `new room created`,
            newRoom
        })

    }catch(err){
        err.message = 'unbale to create new room',
        next(err);
    }
}

async function joinRoom(req,res,next){
    const {userId, roomId} = req.body;
    if(!roomId || !userId){
        return res.status(400).json({message: 'please provide user Id and room Id'});
    }
    try{
        const room = await rooms.findOne({where: {roomId: roomId}});
        



    }catch(err){

    }
}












