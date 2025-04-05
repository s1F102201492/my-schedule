'use client';

import { Button, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { signup } from './action'
import Avatar from '../account/avatar';

interface functionProps {
    handleChangePage: () => void;
}

const Signup:React.FC<functionProps> = ({handleChangePage}) => {
    const [imgIcon, setImgIcon] = useState<string | null>()

  return (
    <div>
        <form>
        <Typography>Eメールアドレス</Typography>
        <TextField id="email" name="email" type='email' required />
        <Typography>パスワード</Typography>
        <TextField id="password" name="password" type="password" required />
        <Typography>ユーザーネーム</Typography>
        <TextField id="userName" name="userName" type="text" required />

        <Avatar uid={null} url={null} size={100} onUpload={(url) => {}} />
        <Button type="submit" formAction={signup}>Sign up</Button>
      </form>
      <Link onClick={handleChangePage} underline='hover' 
      sx={{cursor: "pointer"}}>アカウントをすでにもっている方</Link>
    </div>
  )
}

export default Signup