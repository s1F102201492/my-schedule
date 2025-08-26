import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

const NullUser = () => {
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px",
                }}>
                <Typography>ログインしてください。</Typography>
                <Button
                    variant='contained'
                    component={Link}
                    href='/userauth'
                    sx={{ mt: 2 }}>
                    ログイン
                </Button>
            </Box>
        </div>
    );
};

export default NullUser;
