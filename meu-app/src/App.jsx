import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import NotFound from './pages/NotFound'


export default function App() {
  return (
    <div>

      {/*BrowserRouter: ele fornece funcionalidade de roteamento de componentes. É a raiz/base.*/}

      <BrowserRouter>

        {/*Routes: componente usado para definir as rotas da sua aplicação.
         Dentro deste componente, você pode especificar as diferentes rotas e
         os componentes que serão renderizados quando essas rotas forem acessadas. */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>  

      </BrowserRouter>

    </div>
  )
}
