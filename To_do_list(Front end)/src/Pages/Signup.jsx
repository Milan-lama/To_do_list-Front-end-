import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Signup.css'
const Signup = () => {
    const Navigate = useNavigate();
    const [userInfo,setUserInfo] = useState({
        username:"",
        email:"",
        password:""
    })
    const handelChange = (e) =>{
        const{name,value} = e.target    
        setUserInfo({
            ...userInfo,
            [name]:value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5001/api/users/signup', userInfo);
          // Handle successful signup
          console.log('Signup successful:', response.data);
          if(response.data.response){
            Navigate('/signin')
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert(error.response.data.message)
          } else {
            console.error('Error:', error);
          }
        }
      };
    return (
    <div className='formContainer'>
        <form onSubmit={handleSubmit} className='form'>
        <span className='title'>TO-DO-LIST</span>
            <input
                type='text'
                placeholder='Username'
                name = "username"
                value = {userInfo.username}
                onChange={handelChange}
                required 
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={userInfo.email}
                onChange={handelChange}
                required
            />
            <input
                type='password'
                placeholder='Password'
                name='password'
                value={userInfo.password}
                onChange={handelChange}
                required
            />
            <button type='submit'>Sign Up</button>
            <p>You do have an account?<Link to='/Signin'>Sign in</Link></p>
        </form>
    </div>
  )
}

export default Signup