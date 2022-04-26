import React, {useEffect, useState} from 'react';

interface Todos {
    id: number
    title: string
    completed: boolean
}

const Todo: React.FC = () => {
    const [value, setValue] = useState<string>('Heelo')
    const [todos, setTodos] = useState<Todos[]>([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as Todos[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleTodoChange = (id: number) => {
        setTodos(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed
                }
            }
            return item
        }))
    }

    const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const newTodo = {
            id: todos.length + 1,
            title: value,
            completed: false
        }
        if (evt.key === 'Enter') {
            setTodos(prev => [newTodo, ...prev])
        }
    }

    const removeHandler = (id: number) => setTodos(prev => prev.filter(item => item.id !== id))

    return (
        <div className='my-8'>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='p-5 mb-8 min-w-full border-b-2 border-b-indigo-500 active:outline-0 focus:outline-none text-3xl'
                placeholder='Type your todo'
                onKeyPress={handleKeyPress}
            />

            <div>
                {todos.length ? todos.map(todo => <ul onClick={() => handleTodoChange(todo.id)}
                                                      className={`${todo.completed ? 'bg-green-100' : 'bg-red-100'} grid grid-cols-[50px_1fr_auto_auto] gap-6 mx-auto border-b-2 border-b-indigo-50 p-5`}>
                        <li>{todo.id}</li>
                        <li className={`${todo.completed && 'line-through'}`}>{todo.title}</li>
                        <input className='self-center w-8 h-8' type="checkbox" checked={todo.completed}/>
                        <span onClick={() => removeHandler(todo.id)}
                              className='text-3xl cursor-pointer hover:bg-red-300 rounded-full'>ⓧ</span>
                    </ul>)
                    :
                    <p className='text-center border-b-2 border-b-indigo-50'>Empty todo list</p>
                }
            </div>
        </div>
    );
};

export default Todo;