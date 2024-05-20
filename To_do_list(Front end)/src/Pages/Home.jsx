import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Input from '../Components/Input';
import TaskList from '../Components/TaskList';

export const Context = React.createContext();

export const Home = () => {
    const [listTask, setListTask] = useState([]);
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/list", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setListTask(response.data);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.message);
                } else {
                    console.error('Error:', error);
                }
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <Context.Provider value={{token ,setListTask}}>
                <div className="container">
                    <Input />
                    <div className='to_do_list_container'>
                        {listTask && listTask.map(task => (
                            <TaskList key={task._id} taskId={task._id} task={task.title} duedate={task.duedate} />
                        ))}
                    </div>
                </div>
            </Context.Provider>
        </>
    );
};
