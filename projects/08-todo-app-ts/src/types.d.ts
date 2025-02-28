import { TODO_FILTERS } from './consts.js'

export interface Todo {
  id: string,
  title: string,
  completed: boolean
}

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
