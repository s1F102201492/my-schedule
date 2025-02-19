'use client';

import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../components/TodoContext';
import AllTodoItem from './AllTodoItem';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from "@mui/material/Grid2";

const AllTodoList = () => {
  const todoContext = useContext(TodoContext);
  
  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { todos, fetchAllTodos } = todoContext;

  useEffect(() => {
    fetchAllTodos();
  },[])

  return (
    <div>
      <Box sx ={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="タスクを検索"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ToggleButtonGroup
            exclusive
            aria-label="task filter"
          >
            <ToggleButton value="all" aria-label="all tasks">
              全て
            </ToggleButton>
            <ToggleButton value="active" aria-label="active tasks">
              アクティブ
            </ToggleButton>
            <ToggleButton value="archived" aria-label="archived tasks">
              アーカイブ済み
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="sort-select-label">並べ替え</InputLabel>
            <Select
              labelId="sort-select-label"
              label="並べ替え"
            >
              <MenuItem value="startDate">開始日順</MenuItem>
              <MenuItem value="endDate">終了日順</MenuItem>
              <MenuItem value="progress">達成率順</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
        <Grid container spacing={3}>
          {todos.map((todo) => <AllTodoItem key={todo.id} todo={todo} />)}
        </Grid>
      </Box>
    </div>
  )
}

export default AllTodoList