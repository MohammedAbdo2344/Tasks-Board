import  { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    });
    // console.log(task)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name.length < 3) return toast.error("Task must have more than 3 charachters")
        if (task.name.length > 100) return toast.error("Task must not be more than 100 charachters")
        setTasks((prev) => {
            const list = [...prev, task];
            localStorage.setItem("Tasks", JSON.stringify(list));
            return list
        })
        toast.success("Task Created Successful")
        setTask({
            id: "",
            name: "",
            status: "todo"
        })
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <input
                type="text"
                name=""
                id=""
                value={task.name}
                placeholder='Enter Task Name'
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 w-64 px-2'
                onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
            />
            <button type='submit' className='bg-cyan-500 rounded-md px-4 h-10 text-white'>Create</button>
        </form>
    )
}

export default CreateTask