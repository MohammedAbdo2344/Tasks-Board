import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import { Toaster } from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("Tasks") || '{}'));
  }, [])
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-16">
        <Header />
        <CreateTask setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
        <Footer />
      </div>
    </DndProvider>
  )
}

export default App
