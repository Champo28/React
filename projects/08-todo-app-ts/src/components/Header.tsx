import { CreateTodo } from './CreateTodo.tsx'

interface Props {
  onAddTodo: (title: string) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className='header'>
      <h1>todo
        <img
          style={{ width: '60px', height: '60px' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'
        />
      </h1>

      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}
