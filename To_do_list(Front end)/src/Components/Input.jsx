import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Pages/Home';

export default function Input() {
    const {token ,setListTask} = useContext(Context); // Assuming Context provides token directly
    const [task, setTask] = useState({
        title: "",
        duedate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const addTask = async () => {
        try {
            // Convert the date to ISO string if necessary
            const taskToSend = {
                ...task,
                duedate: new Date(task.duedate).toISOString() // Converts YYYY-MM-DD to ISO 8601 string
            };
            

            const response = await axios.post("http://localhost:5001/api/list", taskToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setListTask(preTask=>[...preTask,response.data])
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert(error.response.data.message);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <>
            <div className='task_writing_container'>
                <div className='text_area'>
                    <input 
                        type='text' 
                        placeholder='Enter Task...'
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="date" 
                    id='date'
                    name="duedate" 
                    value={task.duedate} // Ensure the date input reflects the state
                    onChange={handleChange} 
                />
                <button onClick={addTask} className='task_btn'>Add task</button>
            </div>
        </>
    );
}
