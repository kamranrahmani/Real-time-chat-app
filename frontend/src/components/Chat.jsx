import React, {useEffect, useState, useContext, useRef, useCallback} from 'react'
import {FaTelegramPlane} from 'react-icons/fa'
import { authContext } from '../context/authContext'
import {io} from 'socket.io-client'
import {v4} from 'uuid'
import { handleMessage } from '../utils/messageHandler'
import Message from './Message'
import AddFriend from './AddFriend'
import FriendRequests from './FriendRequests'

function Chat() {
    const authCtx = useContext(authContext);
    const chatAreaRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [FriendRequestsVisibility, setFriendRequestsVisibility] = useState(false);
    const [friends, setFriends] = useState([]);
    const [activeFriend, setActiveFriend] = useState({id: ''});
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState('');
    

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        newSocket.emit('connected', authCtx.user);
        newSocket.emit('get friends', authCtx.user.userId);

        // newSocket.on('private message', (message) => {
        //     console.log('pv fired');
        //     console.log('active friend id ' + activeFriend.id);
        //     if(message.senderId === activeFriend.id){
        //         setMessages(prevMessages => [...prevMessages, message]);
        //     }
        // })
        newSocket.on('send friends', (friends) => setFriends(friends));
        setSocket(newSocket);
        return () => newSocket.disconnect();
    },[])
    
    
    useEffect(() => {
        if(socket){
            socket.on('private message', (message) => {
                if(message.senderId === activeFriend.id){
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            })
        }
       
        return () =>  socket?.removeAllListeners('private message');
    }, [activeFriend])


    const textHandler = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message.trim().length === 0){
            return
        }
        if(activeFriend.id === '') return ;
        const [date, time] = new Date().toLocaleString().split(', ');
        const newMessage = {
            senderId: authCtx.user.userId,
            text: message,
            date: date,
            time: time
        };
        activeFriend.id ? newMessage.recepientId = activeFriend.id : newMessage.roomId = activeRoom;
        socket.emit('new message', newMessage);
        setMessages([...messages, newMessage]);
        setMessage('');
    }

    return authCtx.isAuthenticated ? ( <div className='relative flex flex-col mx-auto mb-16 px-4 py-4 rounded w-[95%] h-[95vh] bg-gradient-to-t from-transparent to-rose-900/20 shadow-2xl shadow-rose-500/60'>
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
                        const activeClass = activeFriend.id === friendId ? 'text-blue-700' : ''
                        const friendItemClasses = 'hover:cursor-pointer mb-3 ' + activeClass;   //user can have either active room or friend not both.
                        return <li key={friend.id} className={friendItemClasses} onClick={() => {setActiveFriend({id: friendId}); setActiveRoom(''); setMessages([])}}>{friendId}</li>
                    })}
                </ul>
            </div>
        </div>
        <div className='flex flex-col space-y-4 jsutify-between flex-1'>
            {/* chat area */}
            <div ref={chatAreaRef} id='chat-area' className= 'flex flex-col space-y-4 flex-1  overflow-y-scroll max-h-[35rem] px-4 py-4'>
                {messages.map(message => {
                    const style = message.senderId === authCtx.user.userId ? 'bg-rose-800/20 w-80 px-4 py-2 rounded self-end mb-4' : 'bg-gray-500/20 w-80 px-4 py-2 rounded mb-4';
                    return <Message key={v4()} text={message.text} userId={message.senderId} time={message.time} date={message.date} classes={style}/>
                })}
            </div>
            {/* input form */}
            <form onSubmit={sendMessage} className='relative'>
                <div className='relative'>
                    <input value={message} onChange={textHandler} type="text" placeholder='Write your message' autoFocus className='w-full text-black px-4 text-lg h-10 rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
                    <button type='submit' className='absolute flex items-center top-0 right-0 bg-rose-600 px-6 py-2'>Send <FaTelegramPlane className='ml-1 mt-[1px]'/></button>
                </div>
            </form>
        </div>
        
    </div>
</div>): window.location.replace('/login')
}

export default Chat
