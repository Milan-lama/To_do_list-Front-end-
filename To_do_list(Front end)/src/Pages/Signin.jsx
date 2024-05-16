import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css'
const Signin = () => {
    const Navigate = useNavigate()
    const [userLogIn,setUserLogIn] = useState({
        email:"",
        password:""
    })
    const handelChange = (e) =>{
        const{name,value} = e.target    
        setUserLogIn({
            ...userLogIn,
            [name]:value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5001/api/users/login', userLogIn);
          localStorage.setItem('jwt',response.data.accessToken)
            Navigate('/')
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
                type='email'
                placeholder='Email'
                name='email'
                value={userLogIn.email}
                onChange={handelChange}
                required
            />
            <input
                type='password'
                placeholder='Password'
                name='password'
                value={userLogIn.password}
                onChange={handelChange}
                required
            />
            <button type='submit'>Sign Up</button>
            <p>You don;t have an account?<Link to='/signup'>Sign up</Link></p>
        </form>
    </div>
  )
}

export default Signin
