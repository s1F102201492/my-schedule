import React from 'react';
import { Button, Link, TextField, Typography } from '@mui/material';
import { login } from '../userauth/action';

interface functionProps {
    handleChangePage: () => void;
}

const Login:React.FC<functionProps> = ({handleChangePage}) => {

    return (
        <div>
            <form>
            <Typography>Eメールアドレス</Typography>
            <TextField id="email" name='email' type='email' required />
            <Typography>パスワード</Typography>
            <TextField id="password" name='password' type="password" required />
            
            {/* ✅Server Actionsでログイン、サインアップ */}
            <Button type="submit" formAction={login}>Log in</Button>
            
            
            </form>
            <Link onClick={handleChangePage} underline='hover'
            sx={{cursor: "pointer"}}>アカウントを持っていない方</Link>
        </div>
      )
}

export default Login