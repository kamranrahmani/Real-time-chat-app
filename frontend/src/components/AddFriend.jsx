import React, {useState} from 'react'




function AddFriend({visibilitySetter, socket, userId}) {
    socket.on('add friend error', msg => setAddFriendMsg(msg));
    socket.on('add friend success', msg => {
        setAddFriendMsg(msg);
        setTimeout(() => {
            visibilitySetter(false)
        },1000)
    })



    const [friendId, setFriendId] = useState('');
    const [addFriendMsg, setAddFriendMsg] = useState('');


    const sendRequest = () => {
        if(friendId.length === 0){
            return
            // add error message for empty string
    }
    socket.emit('add friend',userId, friendId);
}

  return (
    <div className='absolute rounded w-2/5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-10 py-6 bg-blue-950'>
        <button onClick={() => visibilitySetter(false)} className='absolute top-2 right-4 text-lg hover:text-rose-500'>&#10005;</button>
        <h1 className='mb-4'>Add Friend</h1>
        <p className='text-rose-500'>{addFriendMsg}</p>
        <input value={friendId} onChange={(e) => setFriendId(e.target.value.trim())} type="text" className='w-full px-2 py-2 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' placeholder='Enter user id'/>
        <button onClick={sendRequest} className='mt-6 bg-rose-500 px-4 py-2 w-full rounded hover:bg-rose-600 duration-100'>Send Request</button>
    </div>
  )
}

export default AddFriend
