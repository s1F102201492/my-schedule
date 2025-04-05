'use client';

import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Home() {
    // trueの場合はログインページ、falseはサインアップページを表示
    const [loginPage, setLoginPage] = useState<boolean>(true);
    const handleChangePage = () => {
        setLoginPage(!loginPage);
    }

    return (
        <div>
            {loginPage ? <Login handleChangePage={handleChangePage} /> 
            : <Signup handleChangePage={handleChangePage} />}
        </div>
    );
}
