"use client";

import React from "react";
import { signInWithGoogle } from "@/utils/supabase/authGoogle";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from "@mui/material";
import GoogleIcon from "../components/theme/GoogleIcon"

export default function LoginPage() {

    // Googleログイン
    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    }

    return (
        <div>
            <Container
              maxWidth={false}
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          padding: { xs: 2, sm: 3 },
        }}
      >
        <Card
          elevation={3}
          sx={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ padding: 3 }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
              ログイン
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Googleアカウントでログインしてください
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: 1,
                }}
              >
                Googleでログイン
              </Button>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", pb: 3, px: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              アカウントをお持ちでない場合は、Googleログインで自動的に作成されます
            </Typography>
          </CardActions>
        </Card>
      </Container>
        </div>

    )
}