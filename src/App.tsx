import {NavLink, Routes, Route} from "react-router-dom";
import Todo from "./components/Todo/Todo";
import About from "./components/About/About";

type Pages = {
    id: number
    path: string
    name: string
}

const App = () => {
    const pages: Pages[] = [
        {id: 1, path: '/', name: 'Todo App'},
        {id: 2, path: '/about', name: 'About'},
    ]
    return (
        <div>
            <div className='bg-indigo-700 flex justify-between items-center mx-auto border-2 border-b-indigo-500 p-4 '>
                <h1 className='text-4xl font-bold text-white'>React18 + Typescript</h1>
                <ul>
                    {pages.map(page => <NavLink
                        className={({isActive}) => isActive ? 'text-sky-200 border-b-4  border-b-indigo-500 p-4' : 'text-sky-100 p-4'}
                        to={page.path}>{page.name}</NavLink>)}
                </ul>
            </div>
            <main className='container mx-auto'>
                <Routes>
                    <Route path='/' element={<Todo/>}/>
                    <Route path='about' element={<About/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App