import React, { useState } from 'react'
import './Home.css'
import axios from 'axios'
export const Home = () => {
    const token = localStorage.getItem("jwt")
    const [task,setTask] = useState({
        task:"",
        duedate : ''
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setTask({
            ...task,
            [name]:value,
        })
    }
    const addTask = async ()=>{
        try {
            console.log(task)
            const response = await axios.post("http://localhost:5001/api/list",task,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
              alert(error.response.data.message)
            } else {
              console.error('Error:', error);
            }
        }
    }

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = async (event) => {
        const youSure = confirm("are you sure ")
        if(youSure){
            const response = await axios.post("http://localhost:5001/api/list",task,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "_id" :"djfd"
                }
            })
        }
      };
    const handelEdit = () =>{
        
    }
  return (
    <>
    <div className="container">
        <div className='task_writing_container'>
            <div className='text_area'>
            <input 
                type='text' 
                placeholder='Enter Task...'
                name = "task"
                value={task.task}
                onChange={handleChange}
            />
            </div>
            <input
                type="date" 
                id='date'
                name="duedate" 
                onChange={handleChange} 
            />
            <button onClick={addTask} className='task_btn'>Add task</button>
        </div>
        <div className='to_do_list_container'>
            <div className='task_container'>
                <input
                    className='checkbox'
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className='list_task_container'>
                    <h1>abc</h1>
                    <h2>Due Date:123</h2>
                </div>
                <button onClick={handelEdit}>Edit</button>
                <button onClick={handleCheckboxChange}>Delete</button>
            </div>
            <div className='task_container'>
                <input
                    className='checkbox'
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className='list_task_container'>
                    <h1>def</h1>
                    <h2>Due Date:456</h2>
                </div>
                <button onClick={handelEdit}>Edit</button>
                <button onClick={handleCheckboxChange}>Delete</button>
            </div>
        </div>
    </div>
    </>
  )
}
