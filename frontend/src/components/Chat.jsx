import React, {useEffect, useState, useContext} from 'react'
import { authContext } from '../context/authContext'
import {FaTelegramPlane} from 'react-icons/fa'
import {io} from 'socket.io-client'
import Message from './Message'
import AddFriend from './AddFriend'
import FriendRequests from './FriendRequests'

function Chat() {
    const authCtx = useContext(authContext);
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [FriendRequestsVisibility, setFriendRequestsVisibility] = useState(false);
    const [friends, setFriends] = useState([]);
    const [activeFriend, setActiveFriend] = useState('');
    
    useEffect(() => {
        const newSocket = io('http://localhost:3000');

        newSocket.on('send friends', (friends) => setFriends(friends));
        newSocket.emit('connected', authCtx.user);
        newSocket.emit('get friends', authCtx.user.userId);
        setSocket(newSocket);
        return () => newSocket.disconnect();
    },[])
    
    const textHandler = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message.length === 0){
            return
        }
    }

    const jsx = authCtx.isAuthenticated ? ( <div className='relative flex flex-col mx-auto mb-16 px-4 py-4 rounded w-[95%] h-[95vh] bg-gradient-to-t from-transparent to-rose-900/20 shadow-2xl shadow-rose-500/60'>
        {showAddFriend && <AddFriend visibilitySetter={setShowAddFriend} socket={socket} userId={authCtx.user.userId}/>}
        {FriendRequestsVisibility && <FriendRequests socket={socket} userId={authCtx.user.userId} setVisibility = {setFriendRequestsVisibility} setFriends={setFriends}/>}
        <div className='flex justify-between border-b border-b-[1px] border-rose-500/50 pb-2 px-4'>
            <h1 className='justify-self-start'>User-Id : {authCtx.user.userId.toUpperCase()}</h1>
            <div className='flex space-x-4'>
                <button onClick={() => setShowAddFriend(true)} className='px-5 py-2 bg-rose-700 rounded-full hover:scale-110 duration-100'>Add friend</button>
                <button onClick={() => setFriendRequestsVisibility(true)} className='px-5 py-2 bg-rose-700 rounded-full hover:scale-110 duration-100'>Friend requests</button>
                <button className='px-5 py-2 bg-rose-700 rounded-full hover:scale-110 duration-100'>Join room</button>
                <button className='px-5 py-2 bg-rose-700 rounded-full hover:scale-110 duration-100'>Create room</button>
            </div>
        </div>
        {/* chat and sidebar */}
        <div className='flex flex-1 pt-4 px-4 space-x-6'>
            <div id='sidebar' className='px-2 w-24'>
                <h1 className='text-xl text-rose-500'>Rooms</h1>
                <div className='max-h-48 overflow-y-scroll overflow-x-hidden'>
                    <ul>
                        {/* rooms */}
                    </ul>
                </div>
                <h1 className='text-xl text-rose-500 mt-6 mb-4'>Friends</h1>
                <div className='max-h-48 overflow-y-scroll overflow-x-hidden'>
                    <ul>
                        {friends.map(friend => {
                            const friendId = friend.userId === authCtx.user.userId ? friend.friendId : friend.userId;
                            const activeClass = activeFriend === friendId ? 'text-blue-700' : ''
                            const friendItemClasses = 'hover:cursor-pointer mb-3 ' + activeClass;
                            return <li key={friend.id} className={friendItemClasses} onClick={() => setActiveFriend(friendId)}>{friendId}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className='flex flex-col space-y-4 jsutify-between flex-1'>
                {/* chat area */}
                <div id='chat-area' className= 'flex flex-col space-y-4 flex-1  overflow-y-scroll max-h-[35rem] px-4 py-4'>
                    <Message text={'i am kamran rahmani full stack developer'} userId={'kamran'} time={'12:36:24'} date={'07/01/2023'} classes={'bg-gray-500/20'}/>
                </div>
                {/* input form */}
                <form onSubmit={sendMessage} className='relative'>
                    <div className='relative'>
                        <input onChange={textHandler} type="text" autoFocus className='w-full text-black px-4 text-lg h-10 rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
                        <button className='absolute flex items-center top-0 right-0 bg-rose-600 px-6 py-2'>Send <FaTelegramPlane className='ml-1 mt-[1px]'/></button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>): window.location.replace('/login')
    return jsx;   
}

export default Chat
