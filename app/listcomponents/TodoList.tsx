import React from 'react'
import TodoItem from './TodoItem'
import TodoChecked from './TodoChecked'
import { List, Typography } from '@mui/material'

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checked: Boolean;
  startdate: string;
  enddate: string;
  interval: number | string[]; 
  // intervalには数字か配列（曜日を格納する）
};

interface TodoListProps {
  todos: TodoProps[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  // タスクがその日なのかを判定する関数が必要

  const notchecktodos = todos.filter(todo => todo.checked == false)
  const checkedtodos = todos.filter(todo => todo.checked == true)
  return (
    <div>
        {/* 完了していないリスト */}
        <List sx={{ width: '100%', maxWidth: 500 }} disablePadding>
          {notchecktodos.map((todo:TodoProps) => <TodoItem key={todo.id} todos={todo} />)}
        </List>
        <br />

        {/* 完了してしたリスト、うすくする */}
        <Typography variant='h6' m={2}>完了したリスト</Typography>
        <List sx={{ width: '100%', maxWidth: 500 }} disablePadding>
        {checkedtodos.map((todo:TodoProps) => <TodoChecked key={todo.id} todos={todo} />)}
        </List>
    </div>
  )
}

export default TodoList