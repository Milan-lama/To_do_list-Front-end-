import React from 'react'

export default function Task() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
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
        <button onClick={handleCheckboxChange}>Delete</button>
    </div>
    </>
  )
}
