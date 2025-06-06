import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
  
      if (response.status >= 200 || response.status < 300) {
        const data = response.data;      
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div>
        <form onSubmit={(e) =>{
          submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
          type="email" 
          value={email}
          onChange={(e) =>{
            setEmail(e.target.value)
          }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          placeholder="Email" 
          required/>
          
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
          type="password"
          value={password}
          onChange={(e) =>{
            setPassword(e.target.value)
          }} 
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          placeholder="Password" 
          required/>
        <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 0 w-full text-lg placeholder:text-base'>Login</button>
        
        <p className='text-center'>New here? <Link to='/signup' className='text-[#10b461]'>Create New Account</Link></p>
        </form>
      </div>

      <div>
        <Link to='/captain-login' className='bg-[#b99c32] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 0 w-full text-lg placeholder:text-base'>Sign In as Captain</Link>
      </div>
    </div>
  );
}

export default UserLogin;