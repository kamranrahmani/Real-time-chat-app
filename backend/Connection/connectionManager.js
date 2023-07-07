const userEvents = require('../Events/userEvents');


class Connection {
    static onlineUsers = new Map();
    constructor(io,socket){
        this.io = io;
        this.socket = socket

        this.socket.on('connected', (user) => this.addToUsers(user));
        this.socket.on('add friend', (userId,friendId) => userEvents.sendFriendRequest(this.socket, userId, friendId));
        this.socket.on('get friend requests', (userId) => userEvents.getAllFriendRequests(this.socket, userId));
        socket.on('delete friend request', (item) => userEvents.deleteFriendRequest(item));
        socket.on('accept friend request', (item) => userEvents.acceptFriendRequest(item));
        socket.on('get friends', (userId) => userEvents.getAllFriends(this.socket,userId));
    }
    addToUsers(user){
        Connection.onlineUsers.set(user.userId, this.socket.id);
    }


}

function connection(io){
    io.on('connection', (socket) => {
        new Connection(io,socket);
        
        socket.on('disconnect', () => console.log('socket disconnected'))
    })
}

module.exports = connection;








