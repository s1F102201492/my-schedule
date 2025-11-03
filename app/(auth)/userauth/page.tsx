"use client";

import React from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: '100vh'}}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Image src="/img/BestPracticeIcon.png" alt="Best Practice Icon" width={170} height={170} />
                </Box>
                <LoginWithGoogle />
                <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    使い方ガイドは
                    <a
                    href="/guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Typography
                            color="primary.main"
                            >
                            こちら
                        </Typography>
                    </a>
                </Box>
            </Box>
        </div>
    );
}
