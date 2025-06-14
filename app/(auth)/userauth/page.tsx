"use client";

import React from "react";
import { signInWithGoogle } from "@/utils/supabase/authGoogle";
import LoginWithGoogle from "./LoginWithGoogle";

export default function LoginPage() {

    // Googleログイン
    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    }

    return (
        <div>
            <LoginWithGoogle />
        </div>

    )
}