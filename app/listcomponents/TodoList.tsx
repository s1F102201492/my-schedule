import React from 'react'
import TodoItem from './TodoItem'
import TodoChecked from './TodoChecked'
import { Typography } from '@mui/material'

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number | null;
  checked: Boolean;
  priority: string;
  startdate: string;
  enddate: string;
  starttime: string | null;
  endtime: string | null;
  interval: number | null;
};

interface TodoListProps {
  todos: TodoProps[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const notchecktodos = todos.filter(todo => todo.checked == false)
  const checkedtodos = todos.filter(todo => todo.checked == true)
  return (
    <div>
        {/* 完了していないリスト */}
        {notchecktodos.map((todo:TodoProps) => <TodoItem key={todo.id} todos={todo} />)}
        <br />

        {/* 完了してしたリスト、うすくする */}
        <Typography variant='h6' m={2}>完了したリスト</Typography>
        {checkedtodos.map((todo:TodoProps) => <TodoChecked key={todo.id} todos={todo} />)}
    </div>
  )
}

export default TodoList