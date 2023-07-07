import React from "react";

function FriendRequestItem({ isOutgoing, item , modifyRequests, socket, setFriends}) {

  const deleteOrAcceptRequest = (action) => {
    socket.emit(action, item);
    if(action === 'accept friend request'){
      setFriends(prev => ([...prev, item]))
    }
    modifyRequests(prevRequests => {
      return  [...prevRequests.filter(request => request.id !== item.id)]
      
    })
  }

  return <>{isOutgoing ? <div className="flex justify-between items-center px-2 my-8">
    <p>your friend request to <span className="text-orange-500 text-lg tracking-wider">{item.friendId}</span> is pending</p>
    <button onClick={() => deleteOrAcceptRequest('delete friend request')} className="px-4 py-1 bg-rose-500 rounded hover:scale-90 active:scale-110 duration-100">Delete</button>
  </div> : <div className="flex justify-between items-center bg-gray-500/20 p-2 my-8 rounded">
      <p>you have a friend request from <span className="text-lg text-orange-500">{item.userId}</span> </p>
      <div className="flex space-x-2">
        <button onClick={() => deleteOrAcceptRequest('accept friend request')} className="bg-emerald-700 px-4 py-1 rounded hover:scale-90 active:scale-110 duration-100">Accept</button>
        <button onClick={() => deleteOrAcceptRequest('delete friend request')} className="bg-rose-500 px-4 py-1 rounded hover:scale-90 active:scale-110 duration-100">Decline</button>
      </div>
    </div>}</>;
}

export default FriendRequestItem;
