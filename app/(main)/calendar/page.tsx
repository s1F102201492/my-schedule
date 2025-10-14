"use client";

import React, { useContext } from "react";
import Calendar from "../../components/Calendar";
import { Box } from "@mui/material";
import { TodoContext } from "../../context/TodoContext";
import FadeLoading from "../../components/common/FadeLoading";
import { AuthContext } from "../../context/AuthContext";
import NullUser from "../../components/NullUser";

const Page = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loading } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loginUser } = authContext;

    return (
        <div>
            {loginUser ? (
                <>
                    {loading ? (
                        <FadeLoading loading={loading} />
                    ) : (
                        <Box sx={{ mt: 4, width: "100%" }}>
                            <Calendar />
                        </Box>
                    )}
                </>
            ) : (
                <NullUser />
            )}
        </div>
    );
};

export default Page;
