import React , {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/authContext'

function Navbar() {
    const authCtx = useContext(authContext);
    const navigate = useNavigate();
    
    const logoutHandler = (e) => {
        authCtx.setIsAuthenticated(false);
        authCtx.setToken(null);
        authCtx.setUser(null);
        navigate('/login');
    }

  return (
    <div className='flex px-6 py-8 justify-between items-center'>
        <img src="../../public/assets/logo.png" alt=""  className='w-16 h-16'/>
        {!authCtx.isAuthenticated ? (<div className='flex space-x-10'>
            <Link to={'/login'} className='bg-gradient-to-r from-violet-900 to-rose-900  px-10 py-4 rounded-full text-white/80 hover:scale-110 duration-200 shadow-lg shadow-rose-900 hover:shadow-none'>Login</Link>
            <Link to={'/signup'} className='bg-gradient-to-r from-violet-900 to-rose-900 px-10 py-4 rounded-full text-white/80 hover:scale-110 duration-200 shadow-lg shadow-rose-900 hover:shadow-none'>Signup</Link>
        </div>) : <button onClick={logoutHandler} className='bg-gradient-to-r from-violet-900 to-rose-900 px-10 py-4 rounded-full text-white/80 hover:scale-110 duration-200 shadow-lg shadow-rose-900 hover:shadow-none'>Logout</button>}
    </div>
  )
}

export default Navbar
