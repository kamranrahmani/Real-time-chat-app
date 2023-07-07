import React, {useEffect, useState} from 'react'
import FriendRequestItem from './FriendRequestItem';

function FriendRequests({socket, userId, setVisibility, setFriends}) {
    const [allRequests, setAllRequests] = useState([]);
    
    useEffect(() => {
        socket.on('send friend requests', (friendRequests) => setAllRequests(friendRequests));
        socket.emit('get friend requests', userId);
    }, [])

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-2/5 h-3/5 overflow-y-scroll px-4 py-10 bg-blue-950'>
        <button onClick={() => setVisibility(false) } className='absolute top-2 right-4 hover:text-rose-500 text-lg'>&#10005;</button>
        {allRequests.map(requestItem => {
            const isOutgoing = requestItem.userId === userId;
            return <FriendRequestItem key={requestItem.id} isOutgoing={isOutgoing} item={requestItem} modifyRequests= {setAllRequests} socket={socket} setFriends={setFriends}/>
        })}
    </div>
  )
}

export default FriendRequests
