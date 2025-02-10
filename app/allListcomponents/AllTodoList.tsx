'use client';

import React, { useContext } from 'react';
import { TodoContext } from '../components/TodoContext';
import AllTodoItem from './AllTodoItem';

const AllTodoList = () => {
    const todoContext = useContext(TodoContext);
    
      if (!todoContext) {
        throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
      }
    
      const { todos } = todoContext;

  return (
    <div>
        {todos.map((todo) => <AllTodoItem key={todo.id} todo={todo} />)}
    </div>
  )
}

export default AllTodoList