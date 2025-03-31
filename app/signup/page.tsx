'use client';

import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { signup } from './action'
import Avatar from '../account/avatar';

const page = () => {
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
    </div>
  )
}

export default page