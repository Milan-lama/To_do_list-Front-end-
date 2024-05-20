import React,{useState,useContext} from 'react'
import axios from 'axios'
import { Context } from '../Pages/Home';
export default function TaskList({task,duedate,taskId}) {
    const { token, setListTask } = useContext(Context);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = async (taskId) => {
        const youSure = confirm("are you sure ")
        if(youSure){  
          try {
            const response = await axios.delete(`http://localhost:5001/api/list/${taskId}`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            setListTask(prevTasks => prevTasks.filter(task => task._id !== taskId));
            console.log(response.data);
          }
          catch(error){
            console.log(error)
          }
        }  
        
      };
    const handelEdit = () =>{
        
    }
  return (
    <>
        <div className='task_container'>
            <input
                className='checkbox'
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className='list_task_container'>
                <h1>{task}</h1>
                <h2>Due Date:{duedate}</h2>
            </div>
            <button onClick={handelEdit}>Edit</button>
            <button onClick={()=>handleCheckboxChange(taskId)}>Delete</button>
        </div>
    </>
  )
}
