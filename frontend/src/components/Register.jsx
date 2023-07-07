import {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate();
    const firstInput = useRef(null);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [tel, setTel] = useState('');
    const [nickname, setNickname] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    useEffect(() => {
        firstInput.current.focus();
    }, [])

    const idHandler = (e) => {
        setUserId(e.target.value);
    }

    const passwordHandler = (e) => {
        if(e.target.value.length < 8){
            setPasswordWarning('password must be at least 8 characters')
            setPassword(e.target.value);
            return
        }
        setPasswordWarning('');
        setPassword(e.target.value);
    }

    const telHandler = (e) => {
        setTel(e.target.value);
    }

    const nicknameHandler = (e) => {
        setNickname(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(userId.length == 0 || password.length == 0 || tel.length == 0 || nickname.length == 0){
            return 
        }
        if(password.length < 8){
            setPasswordWarning('password must be at least 8 characters')
            return;
        }

        const newUser = {
            userId,
            password,
            tel,
            nickname
        }
        try{
            const response = await fetch('http://localhost:3000/auth/signup' ,{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            if(!response.ok){
                console.log(response);
            }
            navigate('/login');

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <form onSubmit={submitHandler} className='flex flex-col space-y-8 mx-auto text-center w-2/5 rounded-lg px-12 pb-8 pt-4 mt-[-12px] bg-slate-900 shadow-xl shadow-rose-900'>
            <h1 className='text-3xl text-rose-500 font-bold mt-2'>Signup</h1>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="id" className='block'>User id</label>
                <input value={userId} ref={firstInput} onChange={idHandler} type="text" id='id' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
            </div>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="password" className='block'>Password</label>
                <input value={password} onChange={passwordHandler} type="password" id='password' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
                <p className='text-rose-500'>{passwordWarning}</p>
            </div>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="nickname" className='block'>Nickname</label>
                <input value={tel} onChange={telHandler} type="text" id='nickname' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
            </div>
            <div className='flex flex-col space-y-2 items-start'>
                <label htmlFor="tel" className='block'>Tel</label>
                <input value={nickname} onChange={nicknameHandler} type="text" id='tel' className='w-full py-1 px-3 text-black rounded outline outline-4 outline-transparent focus:outline-rose-500 duration-200' />
            </div>
           <button type='submit' className='bg-rose-500 py-2 rounded font-bold hover:bg-rose-700 duration-200'>Register</button>
           <p className='m-0'>have an account? <Link to={'/login'} className='text-rose-500'>Login here</Link></p>
        </form>
    </div>
  )
}

export default Register
