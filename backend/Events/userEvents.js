const {users, friends, rooms} = require('../models/index');
const {Op} = require('sequelize');

async function sendFriendRequest (socket, userId, friendId){
    try{
        if(userId === friendId){
            socket.emit('add friend error', 'you cannot request to yourself')
            return;
        }
        const existingFriendId = await users.findOne({where: {userId: friendId}})
        if(!existingFriendId){
            socket.emit('add friend error', `user with id ${friendId} does not exist`);
            return;
        }
        
        // checks if there is any previous pending request between these two users
        const existingRequest = await friends.findOne({where : {
            [Op.or]:[
                {userId: userId, friendId: friendId, status: 'PENDING'},
                {userId: friendId, friendId: userId, status: 'PENDING'},
            ]
        }}); 
        if(existingRequest){
            socket.emit('add friend error', 'you have a pending friend request with this user');
            return;
        }
        const friendRequest = {
            userId,
            friendId,
            status : 'PENDING'
        }
        const sentRequest = await friends.create(friendRequest);
        socket.emit('add friend success');
        return;

    }catch(err){
       socket.emit('add friend error', 'unable to process request');
    }
}

async function getAllFriendRequests (socket, userId) { 
    try{
        const friendRequests = await friends.findAll({where: {
            [Op.or]:[
                {userId: userId , status: 'PENDING'},
                {friendId : userId, status: 'PENDING'}
            ]
        }});
        socket.emit('send friend requests', friendRequests);            // handler this error
        return

    }catch(err){
       console.log(err);
       socket.emit('get friend request error', 'unable to get friend requests');
    }
}

async function deleteFriendRequest (item) {
    try{
        await friends.destroy({where: {
            userId: item.userId,
            friendId: item.friendId
        }})
    }  catch(err){
        console.log(err);
    }
}

async function acceptFriendRequest (item) {
    const friendRequest = await friends.findOne({where: {userId: item.userId, friendId: item.friendId}});
    friendRequest.status = 'ACCEPTED';
    await friendRequest.save();
}

async function getAllFriends (socket,userId) {
    console.log('get all friends fired');
    console.log(userId);
    try{
        const allFriends = await friends.findAll({where : {
            [Op.or] : [
                {userId: userId , status: 'ACCEPTED'},
                {friendId: userId, status: 'ACCEPTED'}
            ]
        }})
        socket.emit('send friends', allFriends);
        return 
    }catch(err){
        socket.emit('send friends error')           // handle it
    }
}




module.exports = {
    sendFriendRequest, getAllFriendRequests, deleteFriendRequest, acceptFriendRequest, getAllFriends
}

















