'use client';

import React, { useContext } from 'react';
import { TodoContext } from '../components/TodoContext';
import AllTodoItem from './AllTodoItem';
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid2";

const AllTodoList = () => {
    const todoContext = useContext(TodoContext);
    
      if (!todoContext) {
        throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
      }
    
      const { todos } = todoContext;

  return (
    <div>
      <Box sx ={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {todos.map((todo) => <AllTodoItem key={todo.id} todo={todo} />)}
        </Grid>
      </Box>
    </div>
  )
}

export default AllTodoList