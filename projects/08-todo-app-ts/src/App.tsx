import { useState } from 'react'
import { Todos } from './components/Todos.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { TODO_FILTERS } from './consts.js'
import { type FilterValue } from './types.js'

const mockTodos = [
  {
    id: '1',
    title: 'Comer 3 veces',
    completed: false
  },
  {
    id: '2',
    title: 'Aprender React + TS',
    completed: true
  },
  {
    id: '3',
    title: 'Entrenar ajedrez',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleCompleted = (id: string, completed: boolean): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ALL) return todo
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    return todo.completed
  })

  const handleAddTodo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
