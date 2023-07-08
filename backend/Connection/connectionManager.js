const userEvents = require('../Events/userEvents');
const messageEvents = require('../Events/messageEvents');

class Connection {
    static onlineUsers = new Map();
    constructor(io,socket){
        this.io = io;
        this.socket = socket

        this.socket.on('connected', (user) => this.addToUsers(user));
        this.socket.on('add friend', (userId,friendId) => userEvents.sendFriendRequest(this.socket, userId, friendId));
        this.socket.on('get friend requests', (userId) => userEvents.getAllFriendRequests(this.socket, userId));
        this.socket.on('delete friend request', (item) => userEvents.deleteFriendRequest(item));
        this.socket.on('accept friend request', (item) => userEvents.acceptFriendRequest(item));
        this.socket.on('get friends', (userId) => userEvents.getAllFriends(this.socket,userId));

        this.socket.on('new message', (message) => messageEvents.saveSendMessage(this.io, this.socket, message, Connection.onlineUsers));
    }
    addToUsers(user){
        Connection.onlineUsers.set(user.userId, this.socket.id);
    }


}

function connection(io){
    io.on('connection', (socket) => {
        new Connection(io,socket);
        
        socket.on('disconnect', () => console.log('socket disconnected')) // handle disconnect event
    })
}

module.exports = connection;








