import {useRef, useEffect, useState} from 'react'
import { useContext } from 'react'
import { authContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const authCtx = useContext(authContext);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const idInput = useRef(null);

    useEffect(() => {
        idInput.current.focus();
    }, [])

    const idHandler = (e) => {
        setUserId(e.target.value);
    } 

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const loginInfo = {
            userId,password
        }
        try{
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            if(!response.ok){
                console.log(response);
                return
            }
            const userInfo = await response.json();
            authCtx.setToken(userInfo.token);
            authCtx.setUser({userId, nickname: userInfo.nickname})
            authCtx.setIsAuthenticated(true);
            navigate('/chat');

        }catch(err){
            return //******************* err component to be added */
        }
    }

  return (
    <div>
       <form onSubmit={submitHandler} className='flex flex-col space-y-8 mx-auto text-center w-2/5 rounded-lg px-12 py-8 bg-slate-900 shadow-xl shadow-rose-900'>
            <h1 className='text-3xl text-rose-500 font-bold'>Login</h1>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="id" className='block'>User id</label>
                <input onChange={idHandler} ref={idInput} type="text" id='id' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
            </div>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="password" className='block'>Password</label>
                <input onChange={passwordHandler} type="password" id='password' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
            </div>
            <button className='bg-rose-500 py-2 rounded font-bold hover:bg-rose-700 duration-200'>Login</button>
        </form>
    </div>
  )
}

export default Login
