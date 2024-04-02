import { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import toast from 'react-hot-toast'

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([])
    const [inprogress, setInprogress] = useState([])
    const [completed, setCompleted] = useState([])
    // use useEffect to separete tasks onto thier statues
    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === "todo")
        const fInprogress = tasks.filter((task) => task.status === "inprogress")
        const fCompleted = tasks.filter((task) => task.status === "completed")
        setTodos(fTodos)
        setInprogress(fInprogress)
        setCompleted(fCompleted)
    }, [tasks])

    const statuses = ["todo", "inprogress", "completed"]
    return (
        <div className='flex gap-16'>
            {
                statuses.map((status, index) => [
                    <Section
                        key={index}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        inprogress={inprogress}
                        completed={completed}
                    />
                ])
            }
        </div>
    )
}

const Section = ({
    status,
    tasks,
    setTasks,
    todos,
    inprogress,
    completed
}) => {
    const addItemToSection = (id:string) => {
        setTasks((prev) => {
            const mTasks = prev.map((t:{id:string}) => {
                if (t.id === id) {
                    return { ...t, status: status }
                }
                return t
            })
            console.log("in addItem",id)
            localStorage.setItem("Tasks", JSON.stringify(mTasks));
            toast.success(`Task added to ${status}`)
            return mTasks;
        });
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item:{id:string}) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    let text = "TODO"
    let bg = "bg-slate-500"
    let taskToMap = todos
    if (status == "inprogress") {
        text = "In Progress"
        bg = "bg-purple-500"
        taskToMap = inprogress
    }
    if (status == "completed") {
        text = "Completed"
        bg = "bg-green-500"
        taskToMap = completed
    }
    return (
        <div ref={drop} className={`w-64 rounded p-2 ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={text} bg={bg} count={taskToMap.length} />
            {taskToMap.length > 0 && taskToMap.map((task) => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-10 pl-4 rounded-md
            uppercase text-sm text-white`}>
            <h2>{text}</h2>
            <div className='ml-2 bg-white w-5 h5 text-black rounded-full flex
            items-center justify-center'>{count}</div>
        </div>
    )
}
const Task = ({ task, tasks, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const handleRemove = (id) => {
        const fTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("Tasks", JSON.stringify(fTasks));
        setTasks(fTasks)
        toast.success("Task Deleted Successfully")
    }
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"} `}>
            <p className={`${task.status == "completed" ? "line-through" : ""}`}>{task.name}</p>
            <button className='absolute bottom-1 right-1 text-slate-400' onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    )
}
export default ListTasks