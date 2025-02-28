import { type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: (id: string) => void
  onToggleCompleteTodo: (id: string, completed: boolean) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo(id, event.target.checked)
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        checked={completed}
        type='checkbox'
        onChange={handleChangeCheckBox}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => { onRemoveTodo(id) }}
      />
    </div>
  )
}
