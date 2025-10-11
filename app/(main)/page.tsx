"use client";

import TodoList from "../todayListComponents/TodoList";
import { Box } from "@mui/material";

export default function Home() {

    return (
        <div>
            <TodoList />
            <Box sx={{ m: 4 }}></Box>
        </div>
    );
}
